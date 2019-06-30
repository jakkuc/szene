//Selected Category Ids: 8, 54, 82, 120, 40, 47, 51
//[].slice.call(document.getElementsByName('categoryIds[]')).map((f,i) => {return "{ id:"+i + ", categorytext: '"+ f.labels[0].innerText.replace(/\n/,'').replace(/\[.*\]/,'')+"' , code : '"+ f.value +"'},";}).join('\n');
export const categoryMap = [
    {id: 0, categorytext: 'AUSSTELLUNGEN', code: '115'},
    {id: 1, categorytext: 'FÜHRUNGEN', code: '116'},
    {id: 2, categorytext: 'WEITERE AUSSTELLUNGEN', code: '117'},
    {id: 3, categorytext: 'BALLETT & TANZ', code: '4'},
    {id: 4, categorytext: 'COMEDY', code: '10'},
    {id: 5, categorytext: 'KABARETT', code: '103'},
    {id: 6, categorytext: 'LESUNGEN', code: '8'},
    {id: 7, categorytext: 'OPER & OPERETTE', code: '6'},
    {id: 8, categorytext: 'THEATER', code: '3'},
    {id: 9, categorytext: 'WEITERE BÜHNENKUNST', code: '9'},
    {id: 10, categorytext: 'Essen & Trinken', code: '122'}, // (manuell)
    {id: 11, categorytext: 'Weiteres Familien & Kinder', code: '86'},
    {id: 12, categorytext: 'Feste', code: '107'},
    {id: 13, categorytext: 'Festivals', code: '13'},
    {id: 14, categorytext: 'Film Kino Tv', code: '18'}, // (manuell)
    {id: 15, categorytext: 'Kongresse, Konferenzen und Tagungen', code: '54'}, // (manuell)
    {id: 16, categorytext: 'Country & Folk', code: '94'},
    {id: 17, categorytext: 'Elektro', code: '21'},
    {id: 18, categorytext: 'Gospel & Chöre', code: '105'},
    {id: 19, categorytext: 'HipHop, RnB, Soul & Funk', code: '20'},
    {id: 20, categorytext: 'Indie & Alternative', code: '93'},
    {id: 21, categorytext: 'Jazz, Blues, Swing & Chanson', code: '22'},
    {id: 22, categorytext: 'Klassik', code: '82'},
    {id: 23, categorytext: 'Pop', code: '55'},
    {id: 24, categorytext: 'Punkrock, Metal & Hardcore', code: '106'},
    {id: 25, categorytext: 'Rock', code: '23'},
    {id: 26, categorytext: 'Singer/Songwriter', code: '120'},
    {id: 27, categorytext: 'Weltmusik', code: '98'},
    {id: 28, categorytext: 'Weitere Konzerte', code: '25'},
    {id: 29, categorytext: 'Musicals', code: '29'},
    {id: 30, categorytext: 'Shows & Varieté', code: '30'},
    {id: 31, categorytext: 'Zirkus', code: '31'},
    {id: 32, categorytext: 'Weitere Musicals & Shows', code: '32'},
    {id: 33, categorytext: 'Party', code: '33'}, // (manuell)
    {id: 34, categorytext: 'Religion & Spiritualität', code: '40'}, // (manuell)
    {id: 35, categorytext: 'Ausflugsfahrten', code: '43'},
    {id: 36, categorytext: 'Bootstouren', code: '45'},
    {id: 37, categorytext: 'Hafenrundfahrten', code: '44'},
    {id: 38, categorytext: 'Stadtrundgänge & Führungen', code: '49'},
    {id: 39, categorytext: 'Weitere Rundgänge & Fahrten', code: '46'},
    {id: 40, categorytext: 'Seminare, Kurse & Workshops', code: '47'}, // (manuell)
    {id: 41, categorytext: 'Radtouren', code: '36'},
    {id: 42, categorytext: 'Vorträge und Diskussionsrunden', code: '51'} // (manuell)
];
