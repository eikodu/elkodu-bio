export default {
    openGraph: {
        type: 'website',
        locale: 'az_AZ', // Azərbaycan lokalı üçün
        title: 'Elko | lol', // Paylaşanda görünən əsas başlıq
        url: 'https://elkodu.org', // Sənin sayt ünvanın
        description: 'Welcome to My Bio-Links.', // Paylaşanda görünən təsvir
        keywords: 'Elko, elkodu, developer, gaming, IT, Azerbaijan', // Axtarış sistemləri üçün açar sözlər
        images: [
            {
                width: 1200,
                height: 630,
                url: `https://elkodu.org/og-image.jpg`, // Sənin bayaq yoxladığın maşın şəkli
            },
        ],
        site_name: 'Elko',
    },
    twitter: {
        handle: '@elkodu', // Əgər varsa, öz Twitter istifadəçi adın
        site: 'elkodu.org',
        cardType: 'summary_large_image',
    },
};
