// Splash Screen Logic
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

        async function handleDownload() {
            const url = document.getElementById('urlInput').value.trim();
            const btn = document.getElementById('dlBtn');
            const btnText = document.getElementById('btnText');
            const miniLoader = document.getElementById('miniLoader');
            const status = document.getElementById('statusText');
            const resultBox = document.getElementById('resultBox');
            const errorBox = document.getElementById('errorBox');

            if (!url || !url.includes('instagram.com')) {
                alert("Instagram link required !");
                return;
            }

            // UI State
            btn.disabled = true;
            btnText.innerText = "Analyse";
            miniLoader.classList.remove('hidden');
            resultBox.classList.add('hidden');
            errorBox.classList.add('hidden');

            // Multi-API Logic
            const apis = [
                {
                    name: "API PrexzyV3",
                    url: `https://apis.prexzyvilla.site/download/instagramV3?url=${encodeURIComponent(url)}`,
                    parse: (d) => d.result?.url || d.result?.[0]?.url
                },
                {
                    name: "API Aswin",
                    url: `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(url)}`,
                    parse: (d) => d.data?.[0]?.url
                },
                {
                    name: "API Jawad",
                    url: `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(url)}`,
                    parse: (d) => d.result?.[0]
                }
            ];

            let videoFound = null;

            for (const api of apis) {
                status.innerText = `Serveur : ${api.name}...`;
                try {
                    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(api.url)}`);
                    const proxyData = await res.json();
                    const data = JSON.parse(proxyData.contents);
                    
                    videoFound = api.parse(data);
                    if (videoFound) break;
                } catch (e) { console.error(`${api.name} fail`); }
            }

            if (videoFound) {
                document.getElementById('videoPlayer').src = videoFound;
                document.getElementById('saveBtn').href = videoFound;
                resultBox.classList.remove('hidden');
                status.innerText = "Video ready  !";
            } else {
                errorBox.classList.remove('hidden');
                status.innerText = "";
            }

            btn.disabled = false;
            btnText.innerText = "Download";
            miniLoader.classList.add('hidden');
        }
