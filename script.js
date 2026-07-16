// script.js - Version fixe avec vraie API
const API_URL = "https://discord-id-looker.vercel.app/api/lookup";
async function performSearch() {
    const idInput = document.getElementById('idInput').value.trim();
    if (!idInput) return alert("Entre un ID Discord valide");
    
    const area = document.getElementById('resultArea');
    area.innerHTML = `<p class="text-cyan-400">Recherche réelle en cours sur ID : ${idInput}...</p>`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: idInput })
        });
        
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        area.innerHTML = `
            <div class="bg-zinc-900 p-8 rounded-3xl">
                <h3 class="text-2xl mb-4">${data.username || 'Utilisateur'}</h3>
                <p>ID : ${data.id}</p>
                ${data.avatar ? `<img src="https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=256" class="w-32 h-32 rounded-full mt-4">` : ''}
                <pre class="mt-6 text-sm bg-black p-4 overflow-auto">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    } catch (err) {
        area.innerHTML = `<p class="text-red-400">Erreur : ${err.message}. Vérifie ton token dans server.js et que le serveur tourne.</p>`;
    }
}
