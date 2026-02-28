const menuData = {
    sandwichs: [
        { n: 'Kebab Pomme', p: '12.00€', d: 'Signature : Onglet de veau & kebab grillé' },
        { n: 'Kebab Classique / Poulet', p: '9.50€', d: 'Veau ou poulet grillé au feu de bois' },
        { n: 'Spécial La Pomme', p: '11.00€', d: 'Kebab + steak + fromage' },
        { n: 'Onglet de Veau', p: '11.00€', d: 'La pièce noble du boucher' },
        { n: "Brochette d'Agneau", p: '12.50€', d: 'Tendreté garantie' },
        { n: 'Adana / Kofte', p: '10.50€', d: 'Recette traditionnelle aux épices' },
        { n: 'Kebab Mixte', p: '11.00€', d: 'Le meilleur des deux mondes' },
        { n: 'Falafel', p: '9.00€', d: 'Option végétarienne maison' }
    ],
    plats: [
        { n: 'Kebab Pomme Assiette', p: '16.00€', d: 'Onglet de veau + kebab + blé + frites' },
        { n: 'Grillades Mixte', p: '18.50€', d: "L'assortiment royal du chef" },
        { n: 'Les Deux Kebab', p: '16.00€', d: 'Assiette classique & poulet' },
        { n: 'Grillade Méditerranée', p: '16.50€', d: 'Aubergine farcie + kebab ou adana' },
        { n: '3 Viandes au choix', p: '19.00€', d: 'Pour les appétits de lion' },
        { n: 'Plancha Onglet de Veau', p: '13.00€', d: 'Saisi à la minute' }
    ],
    burgers: [
        { n: 'Triple Cheese', p: '8.50€', d: '3 steaks, 3 fromages' },
        { n: 'Double Cheese', p: '7.50€', d: '2 steaks, 2 fromages' },
        { n: 'Pizza Kebab', p: '12.00€', d: 'Base tomate, fromage, viande kebab' },
        { n: 'Panini au choix', p: '7.00€', d: 'Steak, poulet ou mozzarella' }
    ],
    autres: [
        { n: 'Baklava / Pâtisserie', p: '4.50€', d: 'Douceur traditionnelle' },
        { n: 'Tiramisu / Tarte Daim', p: '3.50€', d: 'Le classique gourmand' },
        { n: 'Lahmacun (Pizza Turque)', p: '4.00€', d: 'Spécialité fine épicée' },
        { n: 'Grande Bouteille', p: '3.50€', d: 'Soda au choix' },
        { n: 'Barquette Frites Gde', p: '3.50€', d: 'Croustillantes à souhait' }
    ]
};

const components = {
    header: `
        <header class="main-header">
            <div class="header-top">
                <a href="index.html" aria-label="Retour à l'accueil La Pomme Ermont">
                    <img src="logo.png" alt="Logo La Pomme Ermont" class="mega-logo">
                </a>
            </div>
            <nav class="main-nav" aria-label="Navigation principale">
                <ul class="nav-links">
                    <li><a href="index.html" data-page="index.html">Accueil</a></li>
                    <li><a href="menu.html" data-page="menu.html">Notre carte</a></li>
                    <li><a href="contact.html" data-page="contact.html">Contact & accès</a></li>
                </ul>
            </nav>
        </header>`,
    footer: `
        <div class="sticky-footer">
            <a href="tel:0134142460" class="sticky-btn">Appeler maintenant</a>
            <a href="https://wa.me/33134142460" class="sticky-btn" style="background:var(--primary); color:#fff;" target="_blank" rel="noreferrer">Commander WhatsApp</a>
        </div>
        <footer class="site-footer">
            <p>© 2026 La Pomme Ermont. Tradition, qualité et cuisson au feu de bois.</p>
        </footer>`
};

let currentCategory = 'sandwichs';

function setActiveNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.toggle('active', link.dataset.page === path);
    });
}

function renderMenu(cat = currentCategory) {
    const grid = document.getElementById('menu-grid');
    const count = document.getElementById('menu-count');
    const searchInput = document.getElementById('menu-search');
    if (!grid) return;

    const query = (searchInput?.value || '').trim().toLowerCase();
    const items = menuData[cat].filter((item) => `${item.n} ${item.d}`.toLowerCase().includes(query));

    if (count) {
        count.textContent = `${items.length} plat${items.length > 1 ? 's' : ''} affiché${items.length > 1 ? 's' : ''}`;
    }

    if (!items.length) {
        grid.innerHTML = '<div class="empty-state">Aucun résultat. Essayez un autre terme de recherche.</div>';
        return;
    }

    grid.innerHTML = items.map((item) => `
        <article class="menu-card">
            <div class="item-info">
                <h3>${item.n}</h3>
                <p>${item.d}</p>
            </div>
            <div class="item-price">${item.p}</div>
        </article>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const headPl = document.getElementById('header-placeholder');
    const footPl = document.getElementById('footer-placeholder');

    if (headPl) {
        headPl.innerHTML = components.header;
    }
    if (footPl) {
        footPl.innerHTML = components.footer;
    }

    setActiveNavLink();

    if (document.getElementById('menu-grid')) {
        renderMenu(currentCategory);

        document.querySelectorAll('.tab-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                currentCategory = event.currentTarget.dataset.cat;
                document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
                event.currentTarget.classList.add('active');
                renderMenu(currentCategory);
            });
        });

        const searchInput = document.getElementById('menu-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => renderMenu(currentCategory));
        }
    }
});
