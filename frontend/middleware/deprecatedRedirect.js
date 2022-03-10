const redirections = [
  { value: '/attorneys/', target: '/lawyers/' },
  { value: '/fr/avocats/', target: '/fr/lawyers/' },
  { value: '/practice-areas/', target: '/our-practice-areas/' },
  { value: '/rankings/', target: '/' },
  { value: '/fr/classements/', target: '/' },
  { value: '/news-and-publications/', target: '/news/' },
  { value: '/publications/', target: '/news/' },
  { value: '/fr/nouvelles-et-publications/', target: '/fr/news/' },
  { value: '/fr/nouvelles/', target: '/fr/news/' },
  { value: '/fr/publications/', target: '/fr/news/' },
  { value: '/fr/carrieres/', target: '/fr/careers/' },
  {
    value: '/attorneys/homayoon-arfazadeh/',
    target: '/lawyers/homayoon-arfazadeh/',
  },
  { value: '/attorneys/philippe-ciocca/', target: '/lawyers/philippe-ciocca/' },
  { value: '/attorneys/amir-djafarrian/', target: '/lawyers/amir-djafarrian/' },
  {
    value: '/attorneys/myriam-fehr-alaoui/',
    target: '/lawyers/myriam-fehr-alaoui/',
  },
  { value: '/attorneys/frederic-gante/', target: '/lawyers/frederic-gante/' },
  { value: '/attorneys/daniel-gatenby/', target: '/lawyers/daniel-gatenby/' },
  {
    value: '/attorneys/nicolas-de-gottrau/',
    target: '/lawyers/nicolas-de-gotrau/',
  },
  { value: '/attorneys/mathieu-granges/', target: '/lawyers/mathieu-granges/' },
  {
    value: '/attorneys/dominique-henchoz/',
    target: '/lawyers/dominique-henchoz/',
  },
  { value: '/attorneys/benjamin-humm/', target: '/lawyers/benjamin-humm/' },
  { value: '/attorneys/marc-miynedjian/', target: '/lawyers/marc-iynedjian/' },
  { value: '/attorneys/marc-joory/', target: '/lawyers/marc-joory/' },
  {
    value: '/attorneys/christophe-de-kalbermatten/',
    target: '/lawyers/christophe-kalbermatten/',
  },
  { value: '/attorneys/philippe-kenel/', target: '/lawyers/philippe-kenel/' },
  {
    value: '/attorneys/benoit-lambercy/',
    target: '/lawyers/benoi-t-lambercy/',
  },
  { value: '/attorneys/karim-piguet/', target: '/lawyers/karim-piguet/' },
  {
    value: '/attorneys/jean-yves-rebord/',
    target: '/lawyers/jean-yves-rebord/',
  },
  {
    value: '/attorneys/thomas-steinmann/',
    target: '/lawyers/thomas-steinmann/',
  },
  { value: '/attorneys/feodora-ah-choon/', target: '/lawyers/boris-vittoz/' },
  { value: '/attorneys/boris-vittoz/', target: '/lawyers/feodora-ah-choon/' },
  {
    value: '/attorneys/alexandre-bahrami/',
    target: '/lawyers/alexandre-bahrami/',
  },
  {
    value: '/attorneys/sundip-k-bhundia/',
    target: '/lawyers/sundip-k-bhundia/',
  },
  {
    value: '/attorneys/virginie-de-kalbermatten/',
    target: '/lawyers/virginie-de-kalbermatten/',
  },
  {
    value: '/attorneys/anne-claude-knupfer/',
    target: '/lawyers/anne-claude-knupfer/',
  },
  { value: '/attorneys/felix-locher/', target: '/lawyers/felix-locher/' },
  { value: '/attorneys/talia-poleski/', target: '/lawyers/tania-poleski/' },
  {
    value: '/attorneys/alicja-zapedowska/',
    target: '/lawyers/alicja-bartosik-zapedowska/',
  },
  {
    value: '/attorneys/gregoire-chappuis/',
    target: '/lawyers/gregoire-chappuis/',
  },
  { value: '/attorneys/ali-dehdashti/', target: '/lawyers/' },
  {
    value: '/attorneys/philippe-florinetti/',
    target: '/lawyers/philippe-florinetti/',
  },
  { value: '/attorneys/samuel-herzig/', target: '/lawyers/samuel-herzig/' },
  { value: '/attorneys/leo-jedwab/', target: '/lawyers/leo-jedwab/' },
  { value: '/attorneys/ludovic-loretan/', target: '/lawyers/ludovic-loretan/' },
  { value: '/attorneys/tania-luminuku/', target: '/lawyers/tania-luminuku/' },
  {
    value: '/attorneys/laurence-malherbe/',
    target: '/lawyers/laurence-malherbe/',
  },
  { value: '/attorneys/manuel-moor/', target: '/lawyers/manuel-moor/' },
  { value: '/attorneys/francois-mudry/', target: '/lawyers/francois-mudry/' },
  { value: '/attorneys/olivia-payot-2/', target: '/lawyers/olivia-payot/' },
  {
    value: '/attorneys/dejan-simeunovic/',
    target: '/lawyers/dejan-simeunovic/',
  },
  { value: '/attorneys/charles-bettex/', target: '/lawyers/charles-bettex/' },
  { value: '/attorneys/lea-froidevaux/', target: '/lawyers/lea-froidevaux/' },
  {
    value: '/attorneys/leopold-von-erlach/',
    target: '/lawyers/leopold-von-erlach/',
  },
  {
    value: '/fr/avocats/homayoon-arfazadeh/',
    target: '/fr/lawyers/homayoon-arfazadeh/',
  },
  {
    value: '/fr/avocats/philippe-ciocca/',
    target: '/fr/lawyers/philippe-ciocca/',
  },
  {
    value: '/fr/avocats/amir-djafarrian/',
    target: '/fr/lawyers/amir-djafarrian/',
  },
  {
    value: '/fr/avocats/myriam-fehr-alaoui/',
    target: '/fr/lawyers/myriam-fehr-alaoui/',
  },
  {
    value: '/fr/avocats/frederic-gante/',
    target: '/fr/lawyers/frederic-gante/',
  },
  {
    value: '/fr/avocats/daniel-gatenby/',
    target: '/fr/lawyers/daniel-gatenby/',
  },
  {
    value: '/fr/avocats/nicolas-de-gottrau/',
    target: '/fr/lawyers/nicolas-de-gotrau/',
  },
  {
    value: '/fr/avocats/mathieu-granges/',
    target: '/fr/lawyers/mathieu-granges/',
  },
  {
    value: '/fr/avocats/dominique-henchoz/',
    target: '/fr/lawyers/dominique-henchoz/',
  },
  { value: '/fr/avocats/benjamin-humm/', target: '/fr/lawyers/benjamin-humm/' },
  {
    value: '/fr/avocats/marc-miynedjian/',
    target: '/fr/lawyers/marc-iynedjian/',
  },
  { value: '/fr/avocats/marc-joory/', target: '/fr/lawyers/marc-joory/' },
  {
    value: '/fr/avocats/christophe-de-kalbermatten/',
    target: '/fr/lawyers/christophe-kalbermatten/',
  },
  {
    value: '/fr/avocats/philippe-kenel/',
    target: '/fr/lawyers/philippe-kenel/',
  },
  {
    value: '/fr/avocats/benoit-lambercy/',
    target: '/fr/lawyers/benoi-t-lambercy/',
  },
  { value: '/fr/avocats/karim-piguet/', target: '/fr/lawyers/karim-piguet/' },
  {
    value: '/fr/avocats/jean-yves-rebord/',
    target: '/fr/lawyers/jean-yves-rebord/',
  },
  {
    value: '/fr/avocats/thomas-steinmann/',
    target: '/fr/lawyers/thomas-steinmann/',
  },
  {
    value: '/fr/avocats/feodora-ah-choon/',
    target: '/fr/lawyers/boris-vittoz/',
  },
  {
    value: '/fr/avocats/boris-vittoz/',
    target: '/fr/lawyers/feodora-ah-choon/',
  },
  {
    value: '/fr/avocats/alexandre-bahrami/',
    target: '/fr/lawyers/alexandre-bahrami/',
  },
  {
    value: '/fr/avocats/sundip-k-bhundia/',
    target: '/fr/lawyers/sundip-k-bhundia/',
  },
  {
    value: '/fr/avocats/virginie-de-kalbermatten/',
    target: '/fr/lawyers/virginie-de-kalbermatten/',
  },
  {
    value: '/fr/avocats/anne-claude-knupfer/',
    target: '/fr/lawyers/anne-claude-knupfer/',
  },
  { value: '/fr/avocats/felix-locher/', target: '/fr/lawyers/felix-locher/' },
  { value: '/fr/avocats/talia-poleski/', target: '/fr/lawyers/tania-poleski/' },
  {
    value: '/fr/avocats/alicja-zapedowska/',
    target: '/fr/lawyers/alicja-bartosik-zapedowska/',
  },
  {
    value: '/fr/avocats/gregoire-chappuis/',
    target: '/fr/lawyers/gregoire-chappuis/',
  },
  { value: '/fr/avocats/ali-dehdashti/', target: '/fr/lawyers/' },
  {
    value: '/fr/avocats/philippe-florinetti/',
    target: '/fr/lawyers/philippe-florinetti/',
  },
  { value: '/fr/avocats/samuel-herzig/', target: '/fr/lawyers/samuel-herzig/' },
  { value: '/fr/avocats/leo-jedwab/', target: '/fr/lawyers/leo-jedwab/' },
  {
    value: '/fr/avocats/ludovic-loretan/',
    target: '/fr/lawyers/ludovic-loretan/',
  },
  {
    value: '/fr/avocats/tania-luminuku/',
    target: '/fr/lawyers/tania-luminuku/',
  },
  {
    value: '/fr/avocats/laurence-malherbe/',
    target: '/fr/lawyers/laurence-malherbe/',
  },
  { value: '/fr/avocats/manuel-moor/', target: '/fr/lawyers/manuel-moor/' },
  {
    value: '/fr/avocats/francois-mudry/',
    target: '/fr/lawyers/francois-mudry/',
  },
  { value: '/fr/avocats/olivia-payot-2/', target: '/fr/lawyers/olivia-payot/' },
  {
    value: '/fr/avocats/dejan-simeunovic/',
    target: '/fr/lawyers/dejan-simeunovic/',
  },
  {
    value: '/fr/avocats/charles-bettex/',
    target: '/fr/lawyers/charles-bettex/',
  },
  {
    value: '/fr/avocats/lea-froidevaux/',
    target: '/fr/lawyers/lea-froidevaux/',
  },
  {
    value: '/fr/avocats/leopold-von-erlach/',
    target: '/fr/lawyers/leopold-von-erlach/',
  },
  { value: '/about-us/strengths-and-differences/', target: '/about-us/' },
  { value: '/about-us/our-organization-and-liability/', target: '/about-us/' },
  { value: '/fr/nous-connaitre/', target: '/fr/about-us/' },
  { value: '/fr/nous-connaitre/notre-cabinet/', target: '/fr/about-us/' },
  {
    value: '/fr/nous-connaitre/our-organization-and-liability/',
    target: '/fr/about-us/',
  },
  {
    value: '/practice-areas/arbitration/',
    target: '/our-practice-areas/arbitration/',
  },
  {
    value: '/practice-areas/private-clients/',
    target: '/our-practice-areas/private-clients/',
  },
  {
    value: '/practice-areas/real-estate-and-construction/',
    target: '/our-practice-areas/real-estate-construction/',
  },
  {
    value: '/practice-areas/corporate-and-m-a/',
    target: '/our-practice-areas/droit-de-societes-fusions-et-acquisitions/',
  },
  {
    value: '/practice-areas/commercial-contracts/',
    target: '/our-practice-areas/',
  },
  {
    value: '/practice-areas/banking-and-finance/',
    target: '/our-practice-areas/droit-bancaire-et-financier/',
  },
  {
    value: '/practice-areas/international-legal-assistance-and-criminal-law/',
    target: '/our-practice-areas/white-collar-crime/',
  },
  {
    value: '/practice-areas/litigation-and-insolvency/',
    target: '/our-practice-areas/litigation/',
  },
  {
    value: '/practice-areas/employment-and-immigration/',
    target: '/our-practice-areas/employment-and-immigration/',
  },
  {
    value: '/practice-areas/intellectual-property-it-and-e-commerce/',
    target: '/our-practice-areas/intellectual-property-and-data-protection/',
  },
  { value: '/practice-areas/tax/', target: '/our-practice-areas/tax/' },
  { value: '/fr/domaines-de-pratique/', target: '/fr/our-practice-areas/' },
  {
    value: '/fr/domaines-de-pratique/arbitrage/',
    target: '/fr/our-practice-areas/arbitration/',
  },
  {
    value: '/fr/domaines-de-pratique/clients-prives/',
    target: '/fr/our-practice-areas/private-clients/',
  },
  {
    value:
      '/fr/domaines-de-pratique/contentieux-et-droit-des-poursuites-et-faillites/',
    target: '/fr/our-practice-areas/litigation/',
  },
  {
    value: '/fr/domaines-de-pratique/contrats-commerciaux/',
    target: '/fr/our-practice-areas/',
  },
  {
    value: '/fr/domaines-de-pratique/droit-bancaire-et-financier/',
    target: '/fr/our-practice-areas/droit-bancaire-et-financier/',
  },
  {
    value:
      '/fr/domaines-de-pratique/droit-de-societes-fusions-et-acquisitions/',
    target: '/fr/our-practice-areas/droit-de-societes-fusions-et-acquisitions/',
  },
  {
    value: '/fr/domaines-de-pratique/emploi-et-immigration/',
    target: '/fr/our-practice-areas/employment-and-immigration/',
  },
  {
    value:
      '/fr/domaines-de-pratique/entraide-judiciaire-internationale-et-droit-penal/',
    target: '/fr/our-practice-areas/white-collar-crime/',
  },
  {
    value: '/fr/domaines-de-pratique/fiscalite/',
    target: '/fr/our-practice-areas/tax/',
  },
  {
    value: '/fr/domaines-de-pratique/immobilier-et-construction/',
    target: '/fr/our-practice-areas/real-estate-construction/',
  },
  {
    value:
      '/fr/domaines-de-pratique/propriete-intellectuelle-informatique-et-commerce-electronique/',
    target: '/fr/our-practice-areas/intellectual-property-and-data-protection/',
  },
  {
    value: '/wp-content/uploads/2018/09/homayoon-arfazadeh.vcf',
    target: '/api/vcard/homayoon-arfazadeh/',
  },
  {
    value: '/wp-content/uploads/2018/10/philippe-ciocca.vcf',
    target: '/api/vcard/philippe-ciocca/',
  },
  {
    value: '/wp-content/uploads/2018/09/amir-djafarrian.vcf',
    target: '/api/vcard/amir-djafarrian/',
  },
  {
    value: '/wp-content/uploads/2020/01/Myriam-Fehr-Alaoui.vcf',
    target: '/api/vcard/myriam-fehr-alaoui/',
  },
  {
    value: '/wp-content/uploads/2018/09/frederic-gante.vcf',
    target: '/api/vcard/frederic-gante/',
  },
  {
    value: '/wp-content/uploads/2018/09/daniel-gatenby.vcf',
    target: '/api/vcard/daniel-gatenby/',
  },
  {
    value: '/wp-content/uploads/2018/09/nicolas-de-gottrau.vcf',
    target: '/api/vcard/nicolas-de-gotrau/',
  },
  {
    value: '/wp-content/uploads/2018/09/mathieu-granges.vcf',
    target: '/api/vcard/mathieu-granges/',
  },
  {
    value: '/wp-content/uploads/2018/09/dominique-henchoz.vcf',
    target: '/api/vcard/dominique-henchoz/',
  },
  {
    value: '/wp-content/uploads/2018/08/benjamin-humm.vcf',
    target: '/api/vcard/benjamin-humm/',
  },
  {
    value: '/wp-content/uploads/2018/08/marc-iynedjian.vcf',
    target: '/api/vcard/marc-iynedjian/',
  },
  {
    value: '/wp-content/uploads/2018/08/marc-joory.vcf',
    target: '/api/vcard/marc-joory/',
  },
  {
    value: '/wp-content/uploads/2018/08/christophe-de-kalbermatten.vcf',
    target: '/api/vcard/christophe-kalbermatten/',
  },
  {
    value: '/wp-content/uploads/2018/08/philippe-kenel.vcf',
    target: '/api/vcard/philippe-kenel/',
  },
  {
    value: '/wp-content/uploads/2018/10/benoit-lambercy.vcf',
    target: '/api/vcard/benoi-t-lambercy/',
  },
  {
    value: '/wp-content/uploads/2022/01/Karim-Piguet.vcf',
    target: '/api/vcard/karim-piguet/',
  },
  {
    value: '/wp-content/uploads/2018/08/jean-yves-rebord.vcf',
    target: '/api/vcard/jean-yves-rebord/',
  },
  {
    value: '/wp-content/uploads/2018/08/thomas-steinmann-1.vcf',
    target: '/api/vcard/thomas-steinmann/',
  },
  {
    value: '/wp-content/uploads/2022/01/Boris-Vittoz.vcf',
    target: '/api/vcard/boris-vittoz/',
  },
  {
    value: '/wp-content/uploads/2018/09/feodora-ah-choon-1.vcf',
    target: '/api/vcard/feodora-ah-choon/',
  },
  {
    value: '/wp-content/uploads/2020/02/Alexandre-Bahrami.vcf',
    target: '/api/vcard/alexandre-bahrami/',
  },
  {
    value: '/wp-content/uploads/2018/10/sundip-k-bhundia.vcf',
    target: '/api/vcard/sundip-k-bhundia/',
  },
  {
    value: '/wp-content/uploads/2022/01/Virginie-de-Kalbermatten.vcf',
    target: '/api/vcard/virginie-de-kalbermatten/',
  },
  {
    value: '/wp-content/uploads/2022/01/Anne-Claude-Knupfer.vcf',
    target: '/api/vcard/anne-claude-knupfer/',
  },
  {
    value: '/wp-content/uploads/2018/10/felix-locher.vcf',
    target: '/api/vcard/felix-locher/',
  },
  {
    value: '/wp-content/uploads/2018/08/talia-poleski.vcf',
    target: '/api/vcard/tania-poleski/',
  },
  {
    value: '/wp-content/uploads/2019/01/alicja-zapedowska.vcf',
    target: '/api/vcard/alicja-bartosik-zapedowska/',
  },
  {
    value: '/wp-content/uploads/2020/12/Gregoire-Chappuis.vcf',
    target: '/api/vcard/gregoire-chappuis/',
  },
  {
    value: '/wp-content/uploads/2018/09/philippe-florinetti.vcf',
    target: '/api/vcard/philippe-florinetti/',
  },
  {
    value: '/wp-content/uploads/2021/04/Samuel-Herzig.vcf',
    target: '/api/vcard/samuel-herzig/',
  },
  {
    value: '/wp-content/uploads/2021/12/Ludovic-Loretan.vcf',
    target: '/api/vcard/ludovic-loretan/',
  },
  {
    value: '/wp-content/uploads/2022/01/Tania-Luminuku.vcf',
    target: '/api/vcard/tania-luminuku/',
  },
  {
    value: '/wp-content/uploads/2018/10/laurence-malherbe.vcf',
    target: '/api/vcard/laurence-malherbe/',
  },
  {
    value: '/wp-content/uploads/2018/08/Manuel-MOOR.vcf',
    target: '/api/vcard/manuel-moor/',
  },
  {
    value: '/wp-content/uploads/2018/10/francois-mudry.vcf',
    target: '/api/vcard/francois-mudry/',
  },
  {
    value: '/wp-content/uploads/2022/01/Dejan-Simeunovic.vcf',
    target: '/api/vcard/dejan-simeunovic/',
  },
  {
    value: '/wp-content/uploads/2020/10/Charles-Bettex.vcf',
    target: '/api/vcard/charles-bettex/',
  },
  {
    value: '/wp-content/uploads/2021/05/Lea-Froidevaux.vcf',
    target: '/api/vcard/lea-froidevaux/',
  },
  {
    value: '/wp-content/uploads/2018/09/homayoon-arfazadeh-1.vcf',
    target: '/api/vcard/homayoon-arfazadeh/',
  },
  {
    value: '/wp-content/uploads/2018/09/philippe-ciocca.vcf',
    target: '/api/vcard/philippe-ciocca/',
  },
  {
    value: '/wp-content/uploads/2018/09/amir-djafarrian-1.vcf',
    target: '/api/vcard/amir-djafarrian/',
  },
  {
    value: '/wp-content/uploads/2020/01/Myriam-Fehr-Alaoui.vcf',
    target: '/api/vcard/myriam-fehr-alaoui/',
  },
  {
    value: '/wp-content/uploads/2018/09/frederic-gante-1.vcf',
    target: '/api/vcard/frederic-gante/',
  },
  {
    value: '/wp-content/uploads/2018/09/daniel-gatenby-1.vcf',
    target: '/api/vcard/daniel-gatenby/',
  },
  {
    value: '/wp-content/uploads/2018/09/nicolas-de-gottrau-1.vcf',
    target: '/api/vcard/nicolas-de-gotrau/',
  },
  {
    value: '/wp-content/uploads/2018/09/mathieu-granges-1.vcf',
    target: '/api/vcard/mathieu-granges/',
  },
  {
    value: '/wp-content/uploads/2018/09/dominique-henchoz-1.vcf',
    target: '/api/vcard/dominique-henchoz/',
  },
  {
    value: '/wp-content/uploads/2018/08/benjamin-humm-2.vcf',
    target: '/api/vcard/benjamin-humm/',
  },
  {
    value: '/wp-content/uploads/2018/08/marc-iynedjian-1.vcf',
    target: '/api/vcard/marc-iynedjian/',
  },
  {
    value: '/wp-content/uploads/2018/08/marc-joory-1.vcf',
    target: '/api/vcard/marc-joory/',
  },
  {
    value: '/wp-content/uploads/2018/08/christophe-de-kalbermatten.vcf',
    target: '/api/vcard/christophe-kalbermatten/',
  },
  {
    value: '/wp-content/uploads/2018/08/philippe-kenel-2.vcf',
    target: '/api/vcard/philippe-kenel/',
  },
  {
    value: '/wp-content/uploads/2018/08/benoit-lambercy-1.vcf',
    target: '/api/vcard/benoi-t-lambercy/',
  },
  {
    value: '/wp-content/uploads/2022/01/Karim-Piguet.vcf',
    target: '/api/vcard/karim-piguet/',
  },
  {
    value: '/wp-content/uploads/2018/08/jean-yves-rebord-2.vcf',
    target: '/api/vcard/jean-yves-rebord/',
  },
  {
    value: '/wp-content/uploads/2018/08/thomas-steinmann-1-1.vcf',
    target: '/api/vcard/thomas-steinmann/',
  },
  {
    value: '/wp-content/uploads/2022/01/Boris-Vittoz.vcf',
    target: '/api/vcard/boris-vittoz/',
  },
  {
    value: '/wp-content/uploads/2018/09/feodora-ah-choon-1.vcf',
    target: '/api/vcard/feodora-ah-choon/',
  },
  {
    value: '/wp-content/uploads/2020/02/Alexandre-Bahrami.vcf',
    target: '/api/vcard/alexandre-bahrami/',
  },
  {
    value: '/wp-content/uploads/2018/09/sundip-k-bhundia.vcf',
    target: '/api/vcard/sundip-k-bhundia/',
  },
  {
    value: '/wp-content/uploads/2022/01/Virginie-de-Kalbermatten.vcf',
    target: '/api/vcard/virginie-de-kalbermatten/',
  },
  {
    value: '/wp-content/uploads/2022/01/Anne-Claude-Knupfer.vcf',
    target: '/api/vcard/anne-claude-knupfer/',
  },
  {
    value: '/wp-content/uploads/2018/08/felix-locher-1.vcf',
    target: '/api/vcard/felix-locher/',
  },
  {
    value: '/wp-content/uploads/2018/08/talia-poleski-2.vcf',
    target: '/api/vcard/tania-poleski/',
  },
  {
    value: '/wp-content/uploads/2019/01/alicja-zapedowska.vcf',
    target: '/api/vcard/alicja-bartosik-zapedowska/',
  },
  {
    value: '/wp-content/uploads/2020/12/Gregoire-Chappuis.vcf',
    target: '/api/vcard/gregoire-chappuis/',
  },
  {
    value: '/wp-content/uploads/2018/09/philippe-florinetti-1.vcf',
    target: '/api/vcard/philippe-florinetti/',
  },
  {
    value: '/wp-content/uploads/2021/04/Samuel-Herzig.vcf',
    target: '/api/vcard/samuel-herzig/',
  },
  {
    value: '/wp-content/uploads/2021/12/Ludovic-Loretan.vcf',
    target: '/api/vcard/ludovic-loretan/',
  },
  {
    value: '/wp-content/uploads/2022/01/Tania-Luminuku.vcf',
    target: '/api/vcard/tania-luminuku/',
  },
  {
    value: '/wp-content/uploads/2018/08/laurence-malherbe-1.vcf',
    target: '/api/vcard/laurence-malherbe/',
  },
  {
    value: '/wp-content/uploads/2018/08/Manuel-MOOR.vcf',
    target: '/api/vcard/manuel-moor/',
  },
  {
    value: '/wp-content/uploads/2018/08/francois-mudry-1.vcf',
    target: '/api/vcard/francois-mudry/',
  },
  {
    value: '/wp-content/uploads/2022/01/Dejan-Simeunovic.vcf',
    target: '/api/vcard/dejan-simeunovic/',
  },
  {
    value: '/wp-content/uploads/2020/10/Charles-Bettex.vcf',
    target: '/api/vcard/charles-bettex/',
  },
  {
    value: '/wp-content/uploads/2021/05/Lea-Froidevaux.vcf',
    target: '/api/vcard/lea-froidevaux/',
  },
  {
    value: '/pdf/generate_pdf.php?id=553',
    target: '/lawyers/homayoon-arfazadeh/',
  },
  {
    value: '/pdf/generate_pdf.php?id=547',
    target: '/lawyers/philippe-ciocca/',
  },
  {
    value: '/pdf/generate_pdf.php?id=612',
    target: '/lawyers/amir-djafarrian/',
  },
  {
    value: '/pdf/generate_pdf.php?id=3384',
    target: '/lawyers/myriam-fehr-alaoui/',
  },
  { value: '/pdf/generate_pdf.php?id=579', target: '/lawyers/frederic-gante/' },
  { value: '/pdf/generate_pdf.php?id=634', target: '/lawyers/daniel-gatenby/' },
  {
    value: '/pdf/generate_pdf.php?id=234',
    target: '/lawyers/nicolas-de-gotrau/',
  },
  {
    value: '/pdf/generate_pdf.php?id=623',
    target: '/lawyers/mathieu-granges/',
  },
  {
    value: '/pdf/generate_pdf.php?id=217',
    target: '/lawyers/dominique-henchoz/',
  },
  { value: '/pdf/generate_pdf.php?id=567', target: '/lawyers/benjamin-humm/' },
  { value: '/pdf/generate_pdf.php?id=53', target: '/lawyers/marc-iynedjian/' },
  { value: '/pdf/generate_pdf.php?id=229', target: '/lawyers/marc-joory/' },
  {
    value: '/pdf/generate_pdf.php?id=238',
    target: '/lawyers/christophe-kalbermatten/',
  },
  { value: '/pdf/generate_pdf.php?id=232', target: '/lawyers/philippe-kenel/' },
  {
    value: '/pdf/generate_pdf.php?id=577',
    target: '/lawyers/benoi-t-lambercy/',
  },
  { value: '/pdf/generate_pdf.php?id=3907', target: '/lawyers/karim-piguet/' },
  {
    value: '/pdf/generate_pdf.php?id=561',
    target: '/lawyers/jean-yves-rebord/',
  },
  {
    value: '/pdf/generate_pdf.php?id=222',
    target: '/lawyers/thomas-steinmann/',
  },
  { value: '/pdf/generate_pdf.php?id=3910', target: '/lawyers/boris-vittoz/' },
  {
    value: '/pdf/generate_pdf.php?id=154',
    target: '/lawyers/feodora-ah-choon/',
  },
  {
    value: '/pdf/generate_pdf.php?id=3406',
    target: '/lawyers/alexandre-bahrami/',
  },
  {
    value: '/pdf/generate_pdf.php?id=534',
    target: '/lawyers/sundip-k-bhundia/',
  },
  {
    value: '/pdf/generate_pdf.php?id=3940',
    target: '/lawyers/virginie-de-kalbermatten/',
  },
  {
    value: '/pdf/generate_pdf.php?id=3934',
    target: '/lawyers/anne-claude-knupfer/',
  },
  { value: '/pdf/generate_pdf.php?id=661', target: '/lawyers/felix-locher/' },
  { value: '/pdf/generate_pdf.php?id=664', target: '/lawyers/tania-poleski/' },
  {
    value: '/pdf/generate_pdf.php?id=2860',
    target: '/lawyers/alicja-bartosik-zapedowska/',
  },
  {
    value: '/pdf/generate_pdf.php?id=3669',
    target: '/lawyers/gregoire-chappuis/',
  },
  {
    value: '/pdf/generate_pdf.php?id=834',
    target: '/lawyers/philippe-florinetti/',
  },
  { value: '/pdf/generate_pdf.php?id=3736', target: '/lawyers/samuel-herzig/' },
  { value: '/pdf/generate_pdf.php?id=3892', target: '/lawyers/leo-jedwab/' },
  {
    value: '/pdf/generate_pdf.php?id=3899',
    target: '/lawyers/ludovic-loretan/',
  },
  {
    value: '/pdf/generate_pdf.php?id=3913',
    target: '/lawyers/tania-luminuku/',
  },
  {
    value: '/pdf/generate_pdf.php?id=574',
    target: '/lawyers/laurence-malherbe/',
  },
  { value: '/pdf/generate_pdf.php?id=2297', target: '/lawyers/manuel-moor/' },
  { value: '/pdf/generate_pdf.php?id=572', target: '/lawyers/francois-mudry/' },
  { value: '/pdf/generate_pdf.php?id=3893', target: '/lawyers/olivia-payot/' },
  {
    value: '/pdf/generate_pdf.php?id=3919',
    target: '/lawyers/dejan-simeunovic/',
  },
  {
    value: '/pdf/generate_pdf.php?id=3630',
    target: '/lawyers/charles-bettex/',
  },
  {
    value: '/pdf/generate_pdf.php?id=3767',
    target: '/lawyers/lea-froidevaux/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1565',
    target: '/fr/lawyers/homayoon-arfazadeh/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2034',
    target: '/fr/lawyers/philippe-ciocca/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1570',
    target: '/fr/lawyers/amir-djafarrian/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3383',
    target: '/fr/lawyers/myriam-fehr-alaoui/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2065',
    target: '/fr/lawyers/frederic-gante/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1802',
    target: '/fr/lawyers/daniel-gatenby/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2081',
    target: '/fr/lawyers/nicolas-de-gotrau/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1873',
    target: '/fr/lawyers/mathieu-granges/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2056',
    target: '/fr/lawyers/dominique-henchoz/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2044',
    target: '/fr/lawyers/benjamin-humm/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2075',
    target: '/fr/lawyers/marc-iynedjian/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2077',
    target: '/fr/lawyers/marc-joory/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=243',
    target: '/fr/lawyers/christophe-kalbermatten/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2089',
    target: '/fr/lawyers/philippe-kenel/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1797',
    target: '/fr/lawyers/benoi-t-lambercy/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3927',
    target: '/fr/lawyers/karim-piguet/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2072',
    target: '/fr/lawyers/jean-yves-rebord/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2097',
    target: '/fr/lawyers/thomas-steinmann/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1563',
    target: '/fr/lawyers/feodora-ah-choon/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3928',
    target: '/fr/lawyers/boris-vittoz/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3408',
    target: '/fr/lawyers/alexandre-bahrami/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1886',
    target: '/fr/lawyers/sundip-k-bhundia/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3941',
    target: '/fr/lawyers/virginie-de-kalbermatten/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3937',
    target: '/fr/lawyers/anne-claude-knupfer/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1804',
    target: '/fr/lawyers/felix-locher/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1877',
    target: '/fr/lawyers/tania-poleski/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2863',
    target: '/fr/lawyers/alicja-bartosik-zapedowska/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3672',
    target: '/fr/lawyers/gregoire-chappuis/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1874',
    target: '/fr/lawyers/philippe-florinetti/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3741',
    target: '/fr/lawyers/samuel-herzig/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3891',
    target: '/fr/lawyers/leo-jedwab/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3902',
    target: '/fr/lawyers/ludovic-loretan/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3926',
    target: '/fr/lawyers/tania-luminuku/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1871',
    target: '/fr/lawyers/laurence-malherbe/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=2298',
    target: '/fr/lawyers/manuel-moor/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=1805',
    target: '/fr/lawyers/francois-mudry/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3894',
    target: '/fr/lawyers/olivia-payot/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3920',
    target: '/fr/lawyers/dejan-simeunovic/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3631',
    target: '/fr/lawyers/charles-bettex/',
  },
  {
    value: '/fr/pdf/generate_pdf.php?id=3770',
    target: '/fr/lawyers/lea-froidevaux/',
  },
]

export default function ({ app, ssrContext, route, params, redirect }) {
  const redirection = redirections.find((it) =>
    it.value.includes(route.fullPath)
  )

  if (redirection && route.fullPath && route.fullPath !== '/') {
    return redirect(redirection.target)
  }
}
