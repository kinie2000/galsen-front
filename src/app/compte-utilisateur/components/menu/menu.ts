import { Menu } from './menu.model'; 

export const menuItems = [ 
    new Menu (10, 'ADMIN_NAV.DASHBOARD', '/compte-utilisateur', null, 'dashboard', null, false, 0),
    new Menu (20, 'ADMIN_NAV.MENU_ITEMS', null, null, 'person', null, true, 0),  
    new Menu (21, 'ADMIN_NAV.VERIFICATION_COMPTE', '/compte-utilisateur/mon-compte/verification-compte', null, 'verified_user', null, false, 20), 
    //new Menu (22, 'ADMIN_NAV.MES_COORDONNEES', '/compte-utilisateur/mon-compte/mes-coodonnees', null, 'verified_user', null, false, 20),
    
    new Menu (22, 'ADMIN_NAV.MES_COORDONNEES', '/compte-utilisateur/mon-compte/mes-coodonnees-valide', null, 'verified_user', null, false, 20),
    new Menu (23, 'ADMIN_NAV.VALIDATION_PERMIS', '/compte-utilisateur/mon-compte/permis-valide', null, 'verified_user', null, false, 20),
    new Menu (24, 'ADMIN_NAV.MES_PARAMETRES', '/compte-utilisateur/mon-compte/mes-parametres', null, 'verified_user', null, false, 20),
    new Menu (30, 'ADMIN_NAV.MES_VEHICULES', null, null, 'person', null, true, 0),  
    new Menu (31, 'ADMIN_NAV.GESTION_VEHICULE', '/compte-utilisateur/mes-vehicules/ajouter-vehicule', null, 'add', null, false, 30), 
    new Menu (32, 'ADMIN_NAV.MES_DISPONIBILITES', '/compte-utilisateur/mes-vehicules/mes-disponibilites', null, 'verified_user', null, false, 30),
    new Menu (40, 'ADMIN_NAV.MES_LOCATIONS', null, null, 'person', null, true, 0),  
    new Menu (41, 'ADMIN_NAV.LOCATAIRE', '/compte-utilisateur/mes-locations/locataire', null, 'verified_user', null, false, 40), 
    
    new Menu (42, 'ADMIN_NAV.PROPRIETAIRE', '/compte-utilisateur/mes-vehicules/ajouter-vehicule', null, 'verified_user', null, false, 40),
    //new Menu (42, 'ADMIN_NAV.PROPRIETAIRE', '/compte-utilisateur/mes-locations/proprietaire', null, 'verified_user', null, false, 40),
    new Menu (50, 'ADMIN_NAV.MES_PAIEMENTS', null, null, 'person', null, true, 0),  
    new Menu (51, 'ADMIN_NAV.PAIEMENTS', '/compte-utilisateur/mes-paiements/mes-paiements', null, 'verified_user', null, false, 50), 
    new Menu (52, 'ADMIN_NAV.REVENUS', '/compte-utilisateur/mes-paiements/mes-revenus', null, 'verified_user', null, false, 50),


    new Menu (60, 'ADMIN_NAV.LITIGE', '/compte-utilisateur/litige', null, 'verified_user', null, false, 0),
    new Menu (70, 'ADMIN_NAV.SINISTRE', '/compte-utilisateur/sinistre', null, 'verified_user', null, false, 0),
    new Menu (80, 'ADMIN_NAV.CONSTAT', '/compte-utilisateur/constat', null, 'verified_user', null, false, 0),

    // new Menu (21, 'ADMIN_NAV.CATEGORIES', '/compte-utilisateur/mon-compte/categories', null, 'category', null, false, 20), 
    // new Menu (22, 'ADMIN_NAV.MENU_ITEMS_LIST', '/compte-utilisateur/mon-compte/list', null, 'list', null, false, 20), 
    // new Menu (23, 'ADMIN_NAV.MENU_ITEM_DETAIL', '/compte-utilisateur/mon-compte/detail', null, 'remove_red_eye', null, false, 20),  
    //new Menu (24, 'ADMIN_NAV.ADD_MENU_ITEM', '/compte-utilisateur/mon-compte/add', null, 'add_circle_outline', null, false, 20), 
    // new Menu (30, 'ADMIN_NAV.SALES', null, null, 'monetization_on', null, true, 0),  
    // new Menu (31, 'ADMIN_NAV.ORDERS', '/compte-utilisateur/sales/orders', null, 'list_alt', null, false, 30), 
    // new Menu (32, 'ADMIN_NAV.TRANSACTIONS', '/compte-utilisateur/sales/transactions', null, 'local_atm', null, false, 30),  
    // new Menu (40, 'ADMIN_NAV.USERS', '/compte-utilisateur/users', null, 'group_add', null, false, 0), 
    // new Menu (45, 'ADMIN_NAV.RESERVATIONS', '/compte-utilisateur/reservations', null, 'event', null, false, 0),  
    // new Menu (50, 'ADMIN_NAV.CUSTOMERS', '/compte-utilisateur/customers', null, 'supervisor_account', null, false, 0),  
    // new Menu (60, 'ADMIN_NAV.COUPONS', '/compte-utilisateur/coupons', null, 'card_giftcard', null, false, 0),  
    // new Menu (70, 'ADMIN_NAV.WITHDRAWAL', '/compte-utilisateur/withdrawal', null, 'credit_card', null, false, 0), 
    // new Menu (80, 'ADMIN_NAV.ANALYTICS', '/compte-utilisateur/analytics', null, 'multiline_chart', null, false, 0), 
    // new Menu (90, 'ADMIN_NAV.REFUND', '/compte-utilisateur/refund', null, 'restore', null, false, 0),  
    // new Menu (100, 'ADMIN_NAV.FOLLOWERS', '/compte-utilisateur/followers', null, 'follow_the_signs', null, false, 0), 
    // new Menu (110, 'ADMIN_NAV.SUPPORT', '/compte-utilisateur/support', null, 'support', null, false, 0), 
    // new Menu (120, 'ADMIN_NAV.REVIEWS', '/compte-utilisateur/reviews', null, 'insert_comment', null, false, 0), 
    // new Menu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    // new Menu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    // new Menu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    // new Menu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    // new Menu (144, 'Level 5', null, '/', 'link', null, false, 143),
    new Menu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'https://www.galsenauto.com', 'open_in_new', '_blank', false, 0)
]