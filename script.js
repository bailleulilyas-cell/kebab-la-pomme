const menuData = {
    sandwichs: [
        { n: "Kebab Pomme", p: "12.00€", d: "Signature : Onglet de veau & Kebab grillé" },
        { n: "Kebab Classique / Poulet", p: "9.50€", d: "Veau ou Poulet grillé au feu de bois" },
        { n: "Spécial La Pomme", p: "11.00€", d: "Kebab + Steak + Fromage" },
        { n: "Onglet de Veau", p: "11.00€", d: "La pièce noble du boucher" },
        { n: "Brochette d'Agneau", p: "12.50€", d: "Tendreté garantie" },
        { n: "Adana / Kofte", p: "10.50€", d: "Recette traditionnelle aux épices" },
        { n: "Kebab Mixte", p: "11.00€", d: "Le meilleur des deux mondes" },
        { n: "Falafel", p: "9.00€", d: "Option végétarienne maison" }
    ],
    plats: [
        { n: "Kebab Pomme Assiette", p: "16.00€", d: "Onglet de Veau + Kebab + Blé + Frites" },
        { n: "Grillades Mixte", p: "18.50€", d: "L'assortiment royal du chef" },
        { n: "Les Deux Kebab", p: "16.00€", d: "Assiette Classique & Poulet" },
        { n: "Grillade Méditerranée", p: "16.50€", d: "Aubergine farcie + Kebab ou Adana" },
        { n: "3 Viandes au choix", p: "19.00€", d: "Pour les appétits de lion" },
        { n: "Plancha Onglet de Veau", p: "13.00€", d: "Saisi à la minute" }
    ],
    burgers: [
        { n: "Triple Cheese", p: "8.50€", d: "3 Steaks, 3 Fromages" },
        { n: "Double Cheese", p: "7.50€", d: "2 Steaks, 2 Fromages" },
        { n: "Pizza Kebab", p: "12.00€", d: "Base tomate, fromage, viande kebab" },
        { n: "Panini au choix", p: "7.00€", d: "Steak, Poulet ou Mozzarella" }
    ],
    autres: [
        { n: "Baklava / Pâtisserie", p: "4.50€", d: "Douceur traditionnelle" },
        { n: "Tiramisu / Tarte Daim", p: "3.50€", d: "Le classique gourmand" },
        { n: "Lahmacun (Pizza Turque)", p: "4.00€", d: "Spécialité fine épicée" },
        { n: "Grande Bouteille", p: "3.50€", d: "Soda au choix" },
        { n: "Barquette Frites Gde", p: "3.50€", d: "Croustillantes à souhait" }
    ]
};

const components = {
    header: `
        <header class="main-header">
            <div class="header-top">
                <a href="index.html"><img src="logo.png" class="mega-logo"></a>
            </div>
            <nav class="main-nav">
                <ul class="nav-links">
                    <li><a href="index.html">ACCUEIL</a></li>
                    <li><a href="menu.html">NOTRE CARTE</a></li>
                    <li><a href="contact.html">CONTACT</a></li>
                </ul>
            </nav>
        </header>`,
    footer: `
        <div class="sticky-footer">
            <a href="tel:0134142460" class="sticky-btn">APPELER MAINTENANT</a>
            <a href="https://wa.me/33134142460" class="sticky-btn" style="background:var(--primary); color:#fff;">COMMANDER WHATSAPP</a>
        </div>
        <footer style="padding: 100px 0 150px; text-align:center; background:#fff; border-top:1px solid #eee;">
            <p>© 2024 La Pomme Ermont. Tradition & Qualité.</p>
        </footer>`
};

function renderMenu(cat) {
    const grid = document.getElementById('menu-grid');
    if(!grid) return;
    grid.innerHTML = menuData[cat].map(i => `
        <div class="menu-card">
            <div class="item-info">
                <h3>${i.n}</h3>
                <p>${i.d}</p>
            </div>
            <div class="item-price">${i.p}</div>
        </div>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const headPl = document.getElementById('header-placeholder');
    const footPl = document.getElementById('footer-placeholder');
    if(headPl) headPl.innerHTML = components.header;
    if(footPl) footPl.innerHTML = components.footer;

    if(document.getElementById('menu-grid')) {
        renderMenu('sandwichs');
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderMenu(e.target.dataset.cat);
            };
        });
    }
});
