// Save this as voting-script.js (REPLACE the old file)
document.addEventListener('DOMContentLoaded', () => {
    
    // --- SIMULATION DATABASE ---
    // In a real app, this data would come from the blockchain.
    // We are faking it with some starting vote counts.
    let simulatedVotes = {
        1: 10452, // Priya Sharma
        2: 8321,  // Arjun Singh
        3: 6755,  // Sameer Khan
        4: 9102,  // Ananya Reddy
        5: 1230   // NOTA
    };
    
    // This matches the candidates on the page.
    const candidatesData = {
        1: { name: "Priya Sharma", party: "Jan Vikas Party (JVP)", symbol: "🌸" },
        2: { name: "Arjun Singh", party: "Rashtriya Pragati Dal (RPD)", symbol: "✋" },
        3: { name: "Sameer Khan", party: "Lok Samman Morcha (LSM)", symbol: "🚲" },
        4: { name: "Ananya Reddy", party: "Nav Bharat Aghadi (NBA)", symbol: "⭐️" },
        5: { name: "None of the Above", party: "NOTA", symbol: "🚫" }
    };

    const voteButtons = document.querySelectorAll('.vote-btn');
    const ballotWrapper = document.getElementById('ballot-wrapper');
    const confirmationSection = document.getElementById('confirmation-section');
    const confirmationMessage = document.getElementById('confirmation-message');
    const resultsSection = document.getElementById('results-section');
    const resultsList = document.getElementById('results-list');

    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get candidate info from the button's data attributes
            const candidateId = button.getAttribute('data-id');
            const candidateName = button.getAttribute('data-candidate');
            const candidateParty = button.getAttribute('data-party');

            const isConfirmed = confirm(`Are you sure you want to vote for ${candidateName} (${candidateParty})? \n\nThis action is final.`);
            
            if (isConfirmed) {
                // --- 1. HIDE THE BALLOT ---
                ballotWrapper.classList.add('hidden');

                // --- 2. SHOW THE CONFIRMATION ---
                confirmationMessage.innerHTML = `
                    <strong>Vote Cast Successfully!</strong>
                    <p style="margin: 0.5rem 0 0 0;">You voted for: <strong>${candidateName}</strong></p>
                `;
                confirmationSection.classList.remove('hidden');

                // --- 3. "UPDATE" & SHOW LIVE RESULTS (SIMULATION) ---
                
                // Add the user's vote to the simulated count
                simulatedVotes[candidateId]++;

                // Generate the HTML for the results list
                resultsList.innerHTML = ""; // Clear any old results
                
                // We sort the results to show the leader first
                const sortedVotes = Object.entries(simulatedVotes).sort(([,a],[,b]) => b - a);
                
                for (const [id, count] of sortedVotes) {
                    const candidate = candidatesData[id];
                    const cardHTML = `
                        <div class="results-card">
                            <span class="symbol">${candidate.symbol}</span>
                            <div class="info">
                                <span class="candidate-name">${candidate.name}</span>
                                <span class="party-name">${candidate.party}</span>
                            </div>
                            <span class="vote-count">${count.toLocaleString('en-IN')}</span>
                        </div>
                    `;
                    resultsList.innerHTML += cardHTML;
                }
                
                // Show the results section
                resultsSection.classList.remove('hidden');
            }
        });
    });
});
