async function getDiscordMemberCount() {
    const guildId = "1025811373780893757"; // Remplace avec l'ID de ton serveur Discord
    const response = await fetch(`https://discord.com/api/v9/invites/yHBahjaWAJ?with_counts=true`);
    const data = await response.json();
    
    if (data.approximate_member_count) {
        document.getElementById("memberCount").textContent = data.approximate_member_count;
    } else {
        document.getElementById("memberCount").textContent = "Erreur";
    }
}

// Met à jour le compteur au chargement du site
getDiscordMemberCount();
