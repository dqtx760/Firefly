import requests, json, base64, os

# Gitee config from PicGo
token = "b6c1a0dbbaf665e4832cff1fb20ae789"
owner = "da-qiang-classmate"
repo = "typora"
branch = "master"
path = "image"
local_file = r"D:\data\images\Article-illustrations\cover-obsidian-clipper-20260527-175000.png"

# Convert to WebP first using PIL
from PIL import Image
img = Image.open(local_file)
webp_path = local_file.replace('.png', '.webp')
img.save(webp_path, 'WEBP', quality=85)
print(f"Converted to WebP: {webp_path}")

# Upload to Gitee
filename = "cover-obsidian-clipper-20260526.webp"
api_url = f"https://gitee.com/api/v5/repos/{owner}/{repo}/contents/{path}/{filename}"

with open(webp_path, 'rb') as f:
    content_b64 = base64.b64encode(f.read()).decode('utf-8')

data = {
    "access_token": token,
    "content": content_b64,
    "message": f"Upload {filename}",
    "branch": branch,
}

r = requests.post(api_url, json=data)
if r.status_code in (200, 201):
    result = r.json()
    raw_url = f"https://gitee.com/{owner}/{repo}/raw/{branch}/{path}/{filename}"
    print(f"Upload success!")
    print(f"URL: {raw_url}")
    # Save URL to a temp file for the next step
    with open(r"D:\project2026\fuwari\_cover_url.txt", 'w') as f:
        f.write(raw_url)
else:
    print(f"Upload failed: {r.status_code} - {r.text}")
    # Check if file already exists - try updating
    if r.status_code == 422:
        # Get SHA of existing file
        get_url = f"https://gitee.com/api/v5/repos/{owner}/{repo}/contents/{path}/{filename}?access_token={token}"
        get_r = requests.get(get_url)
        if get_r.status_code == 200:
            sha = get_r.json().get('sha')
            data['sha'] = sha
            r2 = requests.post(api_url, json=data)
            if r2.status_code in (200, 201):
                raw_url = f"https://gitee.com/{owner}/{repo}/raw/{branch}/{path}/{filename}"
                print(f"Update success! URL: {raw_url}")
                with open(r"D:\project2026\fuwari\_cover_url.txt", 'w') as f:
                    f.write(raw_url)
            else:
                print(f"Update failed: {r2.status_code} - {r2.text}")
        else:
            print(f"Get file info failed: {get_r.status_code}")
