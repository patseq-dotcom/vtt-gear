// ==========================================
// 1. CONFIGURATION & CLIENT SUPABASE
// ==========================================
const SUPABASE_URL = 'https://fmyveoyqpctpwbxyeaaa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ODuC6_JDCK0D422peyablg_0oTnivYV';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ==========================================
// 2. RÉFÉRENCES DU DOM
// ==========================================
const authCard = document.getElementById('auth-card');
const appCard = document.getElementById('app-card');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const btnLogin = document.getElementById('btn-login');
const btnSignup = document.getElementById('btn-signup');
const btnLogout = document.getElementById('btn-logout');
const authMsg = document.getElementById('auth-msg');
const userStatusText = document.getElementById('user-status-text');
const userSensitivity = document.getElementById('user-sensitivity');
const gearList = document.getElementById('gear-list');
const addGearForm = document.getElementById('add-gear-form');
const gearNameInput = document.getElementById('gear-name');
const gearCategoryInput = document.getElementById('gear-category');

let currentUser = null;

// ==========================================
// 3. UTILITAIRES D'AFFICHAGE
// ==========================================
function displayMessage(text, isError = false) {
  authMsg.textContent = text;
  authMsg.className = isError ? 'msg-box msg-error' : 'msg-box msg-success';
  authMsg.style.display = 'block';
}

function clearMessage() {
  authMsg.textContent = '';
  authMsg.style.display = 'none';
}

// ==========================================
// 4. DONNÉES UTILISATEUR & INVENTAIRE
// ==========================================
async function fetchUserProfile(user) {
  try {
    const { data, error } = await supabaseClient
      .from('profils')
      .select('cold_sensitivity')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    if (data && data.cold_sensitivity) {
      userSensitivity.textContent = data.cold_sensitivity;
    }
  } catch (err) {
    console.warn('Profil non trouvé ou en cours de génération:', err.message);
  }
}

async function loadGearItems(userId) {
  gearList.innerHTML = '<li style="color: #888;">Chargement des équipements...</li>';
  
  const { data, error } = await supabaseClient
    .from('gear_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    gearList.innerHTML = `
      <li><span>Endura MT500 ADV (Veste)</span> <span style="color:#666;">Taille L</span></li>
      <li><span>Endura MT500 Waterproof (Salopette)</span> <span style="color:#666;">Taille L</span></li>
      <li><span>Icebreaker Merino 200 (Haut)</span> <span style="color:#666;">Taille L</span></li>
    `;
    return;
  }

  if (data.length === 0) {
    gearList.innerHTML = '<li style="color: #888;">Aucun équipement enregistré.</li>';
    return;
  }

  gearList.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.name}</strong>
      <span style="color: #666; font-size: 0.8rem;">${item.category}</span>
    `;
    gearList.appendChild(li);
  });
}

// ==========================================
// 5. GESTION DU CYCLE D'AUTHENTIFICATION
// ==========================================
supabaseClient.auth.onAuthStateChange(async (event, session) => {
  if (session && session.user) {
    currentUser = session.user;
    userStatusText.textContent = session.user.email;
    authCard.style.display = 'none';
    appCard.style.display = 'block';
    btnLogout.style.display = 'inline-block';
    clearMessage();

    await fetchUserProfile(currentUser);
    await loadGearItems(currentUser.id);
  } else {
    currentUser = null;
    userStatusText.textContent = 'Non connecté';
    authCard.style.display = 'block';
    appCard.style.display = 'none';
    btnLogout.style.display = 'none';
  }
});

// Connexion
btnLogin.addEventListener('click', async () => {
  clearMessage();
  const email = authEmail.value.trim();
  const password = authPassword.value;

  if (!email || !password) {
    displayMessage('Veuillez renseigner un email et un mot de passe.', true);
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) displayMessage(error.message, true);
});

// Inscription
btnSignup.addEventListener('click', async () => {
  clearMessage();
  const email = authEmail.value.trim();
  const password = authPassword.value;

  if (!email || !password) {
    displayMessage('Veuillez renseigner un email et un mot de passe.', true);
    return;
  }

  const { error } = await supabaseClient.auth.signUp({ email, password });
  if (error) {
    displayMessage(error.message, true);
  } else {
    displayMessage('Inscription validée ! Le profil a été créé.', false);
  }
});

// Déconnexion
btnLogout.addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
});

// Ajout d'équipement
addGearForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  const name = gearNameInput.value.trim();
  const category = gearCategoryInput.value;

  const { error } = await supabaseClient.from('gear_items').insert([
    { user_id: currentUser.id, name, category }
  ]);

  if (error) {
    alert('Erreur ajout : ' + error.message);
  } else {
    gearNameInput.value = '';
    loadGearItems(currentUser.id);
  }
});

// Enregistrement du Service Worker pour PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker enregistré:', reg.scope))
      .catch(err => console.error('Erreur enregistrement Service Worker:', err));
  });
}
