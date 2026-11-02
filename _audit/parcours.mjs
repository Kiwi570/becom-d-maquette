/* Parcours propres à BECOM-D : demande d'étude en quatre étapes (page Contact).
   - choix prérempli par l'adresse (?domaine=robotique-sous-marine) et repris dans le cartouche ;
   - une étape sans choix ne passe pas (erreur annoncée) ;
   - le cartouche suit la saisie ; l'envoi simulé ne part qu'une fois (double clic) et le dit. */
export default async function ({ contexte, attendrePret, attendre, BASE, R, T }) {
  for (const taille of ['390×844', '1366×768']) {
    const { ctx, page } = await contexte({ taille: T(taille) });
    const lieu = { page: '/contact', taille };
    try {
      await page.goto(BASE + '/contact?domaine=robotique-sous-marine', { waitUntil: 'load' });
      await attendrePret(page);
      const coche = await page.evaluate(() => { const r = document.querySelector('input[name="domaine"]:checked'); return r ? r.value : null; });
      if (coche !== 'robotique-sous-marine') R.echec('demande : préremplissage', `domaine coché : ${coche}`, lieu);
      const recapDomaine = await page.locator('[data-recap="domaine"]').textContent();
      if (!/Robotique sous-marine/.test(recapDomaine || '')) R.echec('demande : cartouche', `domaine non repris dans le cartouche (« ${recapDomaine} »)`, lieu);
      /* Étape 1 sans choix : refusée. */
      await page.locator('[data-etape-suivante]').click();
      await attendre(200);
      const visible1 = await page.locator('.etape-form[data-etape="1"]').isVisible();
      const erreur = (await page.locator('.etape-form[data-etape="1"] .etape-erreur').textContent()) || '';
      if (!visible1 || !erreur.trim()) R.echec('demande : validation', 'une étape sans choix laisse passer, ou sans message', lieu);
      /* Parcours complet. */
      await page.locator('label.choix:has(input[name="besoin"][value="b2"])').click();
      await page.locator('[data-etape-suivante]').click(); await attendre(550);
      if (!(await page.locator('.etape-form[data-etape="2"]').isVisible())) R.echec('demande : étapes', 'l’étape 2 ne s’affiche pas', lieu);
      await page.locator('[data-etape-suivante]').click(); await attendre(550);
      await page.locator('label.choix:has(input[name="stade"][value="st3"])').click();
      await page.locator('[data-etape-suivante]').click(); await attendre(550);
      if (!(await page.locator('.etape-form[data-etape="4"]').isVisible())) R.echec('demande : étapes', 'l’étape 4 ne s’affiche pas', lieu);
      await page.fill('#f-nom', 'Test Audit'); await page.fill('#f-email', 'test@exemple.fr'); await page.fill('#f-message', 'Essai de parcours.');
      const recapNom = await page.locator('[data-recap="nom"]').textContent();
      if (!/Test Audit/.test(recapNom || '')) R.echec('demande : cartouche', 'le nom saisi n’apparaît pas dans le cartouche', lieu);
      const stade = await page.locator('[data-recap="stade"]').textContent();
      if (!/cahier des charges/.test(stade || '')) R.echec('demande : cartouche', `stade non repris (« ${stade} »)`, lieu);
      /* Consentement manquant : refusé, puis envoi unique. */
      await page.locator('form[data-etapes] button[type="submit"]').click(); await attendre(200);
      if (await page.locator('[data-message-envoi]').isVisible()) R.echec('demande : validation', 'envoi accepté sans consentement', lieu);
      await page.check('#f-accord');
      await page.locator('form[data-etapes] button[type="submit"]').dblclick(); await attendre(300);
      const etat = await page.evaluate(() => ({ off: document.querySelector('form[data-etapes] button[type="submit"]').disabled, msg: document.querySelector('[data-message-envoi]').textContent }));
      if (!etat.off) R.echec('demande : double envoi', 'le bouton reste actif après l’envoi', lieu);
      if (!/simulée/.test(etat.msg)) R.echec('demande : message', 'le message ne dit pas que la demande est simulée', lieu);
      /* Retour en arrière dans les étapes. */
      R.ok(`demande en étapes (${taille})`);
    } finally { await ctx.close(); }
  }
}
