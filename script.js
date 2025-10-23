// --- Candidate Data ---
const candidates = [
  { id: 1, name: "Alice Johnson", party: "Innovate Party", votes: 0 },
  { id: 2, name: "Bob Smith", party: "Future Forward", votes: 0 },
  { id: 3, name: "Carolyna Martinez", party: "Unity Alliance", votes: 0 },
];

// --- Elements ---
const connectWalletBtn = document.getElementById("connectWalletBtn");
const walletInfo = document.getElementById("walletInfo");
const walletAddress = document.getElementById("walletAddress");
const disconnectBtn = document.getElementById("disconnectBtn");
const errorMsg = document.getElementById("errorMsg");
const welcome = document.getElementById("welcome");
const votingArea = document.getElementById("votingArea");
const candidateList = document.getElementById("candidateList");
const resultsContainer = document.getElementById("resultsContainer");
const totalVotesEl = document.getElementById("totalVotes");
const voteTab = document.getElementById("voteTab");
const resultsTab = document.getElementById("resultsTab");
const votingBooth = document.getElementById("votingBooth");
const liveResults = document.getElementById("liveResults");

let account = null;
let hasVoted = false;

// --- Simulate Wallet Connection ---
connectWalletBtn.addEventListener("click", () => {
  errorMsg.classList.add("hidden");
  connectWalletBtn.disabled = true;
  connectWalletBtn.textContent = "Connecting...";

  setTimeout(() => {
    const success = Math.random() > 0.1; // 90% success chance
    if (success) {
      account = "0x" + Math.random().toString(16).substring(2, 42);
      walletAddress.textContent = `${account.substring(0, 6)}...${account.slice(-4)}`;
      walletInfo.classList.remove("hidden");
      connectWalletBtn.classList.add("hidden");
      welcome.classList.add("hidden");
      votingArea.classList.remove("hidden");
    } else {
      errorMsg.textContent = "MetaMask not found. Please install the extension.";
      errorMsg.classList.remove("hidden");
    }
    connectWalletBtn.disabled = false;
    connectWalletBtn.textContent = "Connect Wallet";
  }, 1500);
});

// --- Disconnect Wallet ---
disconnectBtn.addEventListener("click", () => {
  account = null;
  hasVoted = false;
  walletInfo.classList.add("hidden");
  connectWalletBtn.classList.remove("hidden");
  votingArea.classList.add("hidden");
  welcome.classList.remove("hidden");
});

// --- Render Candidates ---
function renderCandidates() {
  candidateList.innerHTML = "";
  candidates.forEach((c) => {
    const div = document.createElement("div");
    div.className = "candidate";
    div.innerHTML = `
      <div>
        <strong>${c.name}</strong><br/>
        <small>${c.party}</small>
      </div>
      <button class="vote-btn" ${hasVoted ? "disabled" : ""} data-id="${c.id}">
        ${hasVoted ? "Voted" : "Vote"}
      </button>
    `;
    candidateList.appendChild(div);
  });

  document.querySelectorAll(".vote-btn").forEach((btn) => {
    btn.addEventListener("click", () => castVote(parseInt(btn.dataset.id)));
  });
}

// --- Cast Vote ---
function castVote(candidateId) {
  if (hasVoted) return;
  hasVoted = true;

  const candidate = candidates.find((c) => c.id === candidateId);
  candidate.votes += 1;
  alert(`✅ Vote cast for ${candidate.name}!`);

  renderCandidates();
  renderResults();
  showResults();
}

// --- Render Results ---
function renderResults() {
  resultsContainer.innerHTML = "";
  const totalVotes = candidates.reduce((acc, c) => acc + c.votes, 0);
  totalVotesEl.textContent = totalVotes;

  candidates
    .sort((a, b) => b.votes - a.votes)
    .forEach((c) => {
      const percent = totalVotes ? ((c.votes / totalVotes) * 100).toFixed(1) : 0;
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="flex justify-between">
          <span><strong>${c.name}</strong></span>
          <span>${c.votes} votes (${percent}%)</span>
        </div>
        <div class="progress"><div class="progress-bar" style="width: ${percent}%;"></div></div>
      `;
      resultsContainer.appendChild(div);
    });
}

// --- Tabs Logic ---
voteTab.addEventListener("click", () => {
  voteTab.classList.add("active");
  resultsTab.classList.remove("active");
  votingBooth.classList.remove("hidden");
  liveResults.classList.add("hidden");
});

resultsTab.addEventListener("click", () => {
  showResults();
});

function showResults() {
  renderResults();
  resultsTab.classList.add("active");
  voteTab.classList.remove("active");
  votingBooth.classList.add("hidden");
  liveResults.classList.remove("hidden");
}

// --- Init ---
renderCandidates();
