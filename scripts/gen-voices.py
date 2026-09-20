"""Generate one MP3 per balloon phrase with Sarvam bulbul:v3 (young female voice, pitched up)."""
import base64, json, os, re, subprocess, sys, time, urllib.request
import imageio_ffmpeg

ROOT = 'D:/raina-birthday'
OUT = f'{ROOT}/public/assets/audio/voice'
os.makedirs(OUT, exist_ok=True)
KEY = os.environ['SARVAM_API_KEY']
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

# Pull the phrase list straight out of settings.ts so the two never drift.
src = open(f'{ROOT}/src/data/settings.ts', encoding='utf-8').read()
block = src[src.index('phrases: ['):src.index('],', src.index('phrases: ['))]
phrases = re.findall(r"\{\s*text:\s*(?:'([^']*)'|\"([^\"]*)\"),\s*say:\s*'([^']*)'", block)
phrases = [(a or b, say) for a, b, say in phrases]
print(len(phrases), 'phrases')

def slug(text):
    s = re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')
    return s or 'clip'

def tts(text):
    body = {"text": text, "target_language_code": "hi-IN", "speaker": "suhani", "pitch": 0.5,
            "pace": 0.95, "loudness": 1.6, "speech_sample_rate": 22050, "model": "bulbul:v3"}
    req = urllib.request.Request('https://api.sarvam.ai/text-to-speech', data=json.dumps(body).encode(),
                                 headers={'api-subscription-key': KEY, 'Content-Type': 'application/json'})
    for attempt in range(3):
        try:
            r = json.load(urllib.request.urlopen(req, timeout=30))
            return base64.b64decode(r['audios'][0])
        except Exception as e:
            print('  retry', attempt, e); time.sleep(1.5)
    raise SystemExit('tts failed for ' + text)

manifest = []
for text, say in phrases:
    name = slug(text)
    wav = f'{OUT}/{name}.wav'; mp3 = f'{OUT}/{name}.mp3'
    if not os.path.exists(mp3):
        open(wav, 'wb').write(tts(say))
        subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', wav, '-codec:a', 'libmp3lame', '-b:a', '48k', '-ac', '1', mp3], check=True)
        os.remove(wav)
    manifest.append((text, f'/assets/audio/voice/{name}.mp3', os.path.getsize(mp3)))
    print(f'{name:28s} {os.path.getsize(mp3)//1024:3d} KB  {say}')

print('total KB', sum(m[2] for m in manifest) // 1024)
json.dump({t: p for t, p, _ in manifest}, open(f'{OUT}/manifest.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
