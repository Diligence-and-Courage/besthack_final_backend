// import { sub } from 'date-fns';
// import NewsAPI from 'newsapi';

import { GetNewsRequest, NewsArticle } from '../../../models';
// import { toISODate } from '../../../utils/dateFormats';
// import { selectNewsDomains } from './selectNewsDomains';

const articles: NewsArticle[] = [
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Олег Давыдов',
    title: 'Киев рассмотрел возможность ударов по хранилищу радиоактивных отходов',
    description:
      'Начальник войск РХБЗ Игорь Кириллов сообщил, что Киев серьезно рассматривает вопрос ударов по хранилищу радиоактивных отходов.',
    url: 'https://lenta.ru/news/2022/04/23/kirillovyader/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/15/20220423150026023/share_8f354e016e8549f6d7bb2268c1dba700.jpeg',
    publishedAt: '2022-04-23T12:05:00Z',
    content: '',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Платон Щукин',
    title: 'Илон Маск назвал цель покупки Twitter',
    description:
      'Американский бизнесмен Илон Маск назвал целью покупки социальной сети Twitter не коммерческие интересы и поиск интересных вложений, а желание создать общественную платформу, которая пользуется максимальным доверием в обществе по всему миру и предоставляет каж…',
    url: 'https://lenta.ru/news/2022/04/23/mt/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/14/20220423144800978/share_3b911fa14b938899cb4d37bc68c4b27b.jpeg',
    publishedAt: '2022-04-23T11:58:00Z',
    content:
      'Twitter , , . Insider.\r\n , , . TED 2022 , , , .\r\n Tesla SpaceX , Twitter, , , . , , , (SEC).\r\n 46,5 . Twitter , .\r\n SEC, Twitter . , Morgan Stanley 12,5 Tesla. .',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Елизавета Новикова',
    title: 'В Госдуме сообщили о трех возможных претендентах на пост Рашкина',
    description:
      'В КПРФ рассказали о трех претендентах на пост депутата Госдумы Валерия Рашкина в случае, если его лишат полномочий после вступления в силу приговора по делу о незаконной охоте. Об этом сообщил первый замглавы комиссии Госдумы по мандатным вопросам, депутат от…',
    url: 'https://lenta.ru/news/2022/04/23/rashkin/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/14/20220423144709062/share_16065d4bf6a881fdd11e71db187eec3b.jpeg',
    publishedAt: '2022-04-23T11:49:01Z',
    content: '',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Алена Шевченко',
    title: 'Названы секреты безопасного использования смартфона',
    description:
      '23 апреля стало известно, что устройства на базе Android можно было взломать с помощью аудиокодека — злоумышленники пользовались ошибкой в кодеке. Эксперт по информационной безопасности Тарас Татаринов считает, что подобная ошибка может произойти с любым прил…',
    url: 'https://lenta.ru/news/2022/04/23/cybercrima/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/14/20220423141620034/share_5012bbccd01bb1bab6bce25ae5c8c967.jpeg',
    publishedAt: '2022-04-23T11:49:00Z',
    content:
      '. . «.» .\r\n23 , Android . .\r\n« , . , , , , », .\r\n, , .\r\n« , . , . , , , », .\r\n , . « . - , », .\r\n , «.» 60 . 1 . , « ». «.» , . 3,3 .\r\n23 , . .',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Алексей Гусев',
    title: 'Костя Цзю назвал главную слабость Фьюри перед боем с Уайтом',
    description:
      'Бывший абсолютный чемпион мира по боксу в первом полусреднем весе Костя Цзю поделился ожиданиями от боя между британцами Тайсоном Фьюри и Диллианом Уайтом. Спортсмен назвал главной слабостью Фьюри недисциплинированность по отношению к тренировкам. «Если он в …',
    url: 'https://lenta.ru/news/2022/04/23/whitefuryslabo/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/13/20220423134915699/share_b0ff20fcb060cefad47a79a307064af5.jpg',
    publishedAt: '2022-04-23T11:44:17Z',
    content: '',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Варвара Кошечкина',
    title: 'Благодатный огонь сошел в храме Гроба Господня в Иерусалиме',
    description:
      'Церемония схождения благодатного огня, которая состоялась в храме Гроба Господня в Иерусалиме, попала на видео. На записи с места событий видно, как толпа прихожан со свечами радостно приветствует благодатный огонь, на фоне слышен колокольный звон.',
    url: 'https://lenta.ru/news/2022/04/23/blagodat/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/14/20220423144559640/share_4abbcf4916fd0ebce033b6cc57ad1454.jpeg',
    publishedAt: '2022-04-23T11:43:00Z',
    content: '',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Варвара Кошечкина',
    title: 'YouTube лишился более 20 процентов российских авторов',
    description:
      'На фоне спецоперации России на Украине и введенных санкций YouTube покинуло более 20 процентов русскоязычных авторов. Согласно данным Brand Analytics, с 24 февраля по 20 апреля количество авторов снизилось на 21 процент, при этом снизилось и число авторов в I…',
    url: 'https://lenta.ru/news/2022/04/23/youtube_poteryal/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/14/20220423140656021/share_75ab01559a8e7534dcd74583cdbdc9f1.jpeg',
    publishedAt: '2022-04-23T11:41:00Z',
    content:
      'YouTube 20 , Brand Analytics .\r\n , 24 20 21 , Instagram ( ; Meta, ), TikTok.\r\n , , . , , , , .\r\n Brand Analytics , YouTube 21 . Instagram, , 56 55 . TikTok . « 87 , 93 . TikTok, », .\r\n «», , , 22 , 1… [+108 chars]',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Маргарита Щигарева',
    title: 'В Германии высказались о необходимости помогать Украине оружием',
    description:
      'Министр финансов ФРГ Кристиан Линднер заявил, что Украина нуждается в военной помощи и тяжелом вооружении. Вместе с тем он напомнил об обязательствах Германии в рамках НАТО. «Мы не можем становиться стороной войны», — сказал глава немецкого Минфина. Об этом с…',
    url: 'https://lenta.ru/news/2022/04/23/lindner/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/14/20220423143450209/share_eddd7be809d32bfb20812790dc862ac0.jpeg',
    publishedAt: '2022-04-23T11:38:00Z',
    content:
      '. .\r\n« . , ( . ".") », . , « » .\r\n , « » . « », .\r\n, . , .\r\n . INSA, 50 , 43 .',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Маргарита Щигарева',
    title: 'Артист «Кривого зеркала» высказался о заработке в программе',
    description:
      'Популярный российский юморист, артист передачи «Кривое зеркало» Александр Морозов описал заработок в программе. Он заявил, что получал «неплохие деньги» благодаря этому шоу. Ранее также стало известно, что юморист также жаловался на звонки коллекторов из-за з…',
    url: 'https://lenta.ru/news/2022/04/23/morozmoney/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/14/20220423141315168/share_8e5c1c2c81d8758418878d42bf5f3a7f.jpg',
    publishedAt: '2022-04-23T11:22:00Z',
    content:
      ', « » . « ».\r\n , . , . , , « » . « [" "] ... . , », .\r\n, , « » 2008 . « . », . , , «» .\r\n 2020 , - . , . , .',
  },
  {
    source: {
      id: 'lenta',
      name: 'Lenta',
    },
    author: 'Елизавета Новикова',
    title: 'В СКР возбудили дело из-за смерти ребенка после падения из окна',
    description:
      'В Москве возбудили дела из-за смерти мальчика после падения из окна жилого дома на юге Москвы. Утром 23 апреля ребенок 2018 года рождения, оставшись на короткое время без присмотра родителей, облокотился на москитную сетку. Она не выдержала веса малыша и выпа…',
    url: 'https://lenta.ru/news/2022/04/23/rebenokskr/',
    urlToImage:
      'https://icdn.lenta.ru/images/2022/04/23/14/20220423141435905/share_3367e82ae7e8a5d1b3741e0e12ce3a0b.jpeg',
    publishedAt: '2022-04-23T11:21:32Z',
    content: ': Komsomolskaya Pravda / Globallookpress.com',
  },
];

export const GetNewsFromApi = async ({
  page = 1,
  pageSize = 10,
}: GetNewsRequest): Promise<NewsArticle[] | null> => {
  // const res = await selectNewsDomains();
  // const domains = res.map((row) => row.domain);

  console.log(page, pageSize);

  // const api = new NewsAPI(process.env.NEWSAPI_KEY);
  // const resp: NewsResponse = await api.v2.everything(<NewsRequest>{
  //   from: toISODate(sub(Date.now(), { days: 7 })),
  //   to: toISODate(Date.now()),
  //   language: 'ru',
  //   page,
  //   pageSize,
  //   domains: domains.join(', '),
  // });
  //
  // if (resp.status === 'error') {
  //   return null;
  // }

  return articles;
};
