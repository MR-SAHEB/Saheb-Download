    
        // © ᴘᴏᴡᴇʀᴇᴅ вч jєαn-s dєv | σвítσ dєv
        window.addEventListener('load', () => {
            const pBar = document.getElementById('p-bar');
            setTimeout(() => { pBar.style.width = '100%'; }, 100);
            
            setTimeout(() => {
                document.getElementById('splash').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('splash').style.display = 'none';
                    document.getElementById('app').classList.remove('hidden');
                }, 800);
            }, 2500);
        });

        async function handleTTDownload() {
            const url = document.getElementById('ttUrl').value.trim();
            const btn = document.getElementById('dlBtn');
            const btnText = document.getElementById('btnText');
            const miniLoader = document.getElementById('miniLoader');
            const status = document.getElementById('statusText');
            const resultBox = document.getElementById('resultBox');
            const errorBox = document.getElementById('errorBox');

            if (!url || !url.includes('tiktok.com')) {
                alert("Lien TikTok invalide !");
                return;
            }

            btn.disabled = true;
            btnText.innerText = "Récupération";
            miniLoader.classList.remove('hidden');
            resultBox.classList.add('hidden');
            errorBox.classList.add('hidden');

            const apis = [
                {
                    name: "HEXA-NODE CORPS",
                    url: `https://apis.davidcyriltech.my.id/download/tiktokv3?url=${encodeURIComponent(url)}`,
                    parse: (d) => ({
                        video: d.video,
                        author: d.author || "TikTok Creator",
                        desc: d.description || "TikTok Video"
                    })
                },
                {
                    name: "BK9 Download",
                    url: `https://bk9.fun/download/tiktok?url=${encodeURIComponent(url)}`,
                    parse: (d) => ({
                        video: d.BK9?.video || d.BK9?.[0]?.url,
                        author: "TikTok User",
                        desc: "Video TikTok"
                    })
                },
                {
                    name: "Aswin Server",
                    url: `https://api-aswin-sparky.koyeb.app/api/downloader/tiktok?url=${encodeURIComponent(url)}`,
                    parse: (d) => ({
                        video: d.data?.video,
                        author: d.data?.author?.nickname,
                        desc: d.data?.title
                    })
                }
            ];

            let foundData = null;

            for (const api of apis) {
                status.innerText = `Recherche : ${api.name}...`;
                try {
                    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(api.url)}`);
                    const proxyData = await res.json();
                    const json = JSON.parse(proxyData.contents);
                    
                    const extracted = api.parse(json);
                    if (extracted && extracted.video) {
                        foundData = extracted;
                        break;
                    }
                } catch (e) {
                    console.error(`${api.name} failed`);
                }
            }

            if (foundData) {
                document.getElementById('videoPlayer').src = foundData.video;
                document.getElementById('saveBtn').href = foundData.video;
                document.getElementById('authorName').innerText = "@" + foundData.author;
                document.getElementById('videoDesc').innerText = foundData.desc;
                
                resultBox.classList.remove('hidden');
                status.innerText = "Succès !";
            } else {
                errorBox.classList.remove('hidden');
                status.innerText = "";
            }

            btn.disabled = false;
            btnText.innerText = "Download the video";
            miniLoader.classList.add('hidden');
        }
    
