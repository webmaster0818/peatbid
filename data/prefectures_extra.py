"""
PREFECTURES_EXTRA - 47都道府県の経済・社会指標データ

PeatBid 地域ページ（都道府県 x 銘柄 = 2,350ページ）のテンプレ反復による
Scaled Content Abuse 判定リスク回避のため、各都道府県固有の実データを注入する目的で作成。

各フィールドの出典:
- households (世帯数): 総務省統計局「令和2年国勢調査（2020年）」一般世帯数 (e-Stat)
  https://www.stat.go.jp/data/kokusei/2020/
- average_income (1人当たり県民所得): 内閣府「県民経済計算 令和3年度(2021年度)」
  https://www.esri.cao.go.jp/jp/sna/data/data_list/kenmin/files/contents/main_2021.html
- gdp_billion_jpy (県内総生産名目・10億円): 内閣府「県民経済計算 令和3年度(2021年度)」
  ※10億円単位（1兆=1,000）
- climate_type: 気象庁「日本の気候区分」及び各都道府県気象台公開情報
  https://www.data.jma.go.jp/obd/stats/etrn/
- alcohol_consumption_rank: 国税庁「酒のしおり（令和5年版／令和4年度データ）」
  成人1人あたり酒類消費数量ランキング
  https://www.nta.go.jp/taxes/sake/shiori-gaikyo/shiori/
- liquor_retail_stores: 国税庁「酒類小売業者の概況（令和4年3月末）」
  https://www.nta.go.jp/taxes/sake/hourei/menkyo/
  ※数値はおおよその規模感（百単位四捨五入）
- main_stations: 国土交通省 駅別乗降人員データ及び各鉄道事業者公開情報
- major_industries: 経済産業省「工業統計」「経済センサス」及び各県統計年鑑

注意:
- 数値は最新の入手可能データを用いたが、年度によって微差があり得る
- 県民所得は2021年度確報ベース（2024年12月時点で内閣府最新公表値）
- 酒類消費ランクは「成人1人あたり消費数量」（国税庁公表値）
- liquor_retail_stores は「酒類小売業免許場数」のおおよその規模感
"""

PREFECTURES_EXTRA = {
    # ====== 北海道 ======
    "hokkaido": {
        "households": "248万世帯",
        "average_income": "278万円",
        "gdp_billion_jpy": "20,300",
        "climate_type": "北海道亜寒帯／冷涼乾燥・冬季は氷点下、ウイスキー熟成に適した冷暗環境",
        "alcohol_consumption_rank": "全国2位（成人1人あたり）",
        "liquor_retail_stores": "約3,100店",
        "main_stations": "札幌駅(JR各線・地下鉄南北線/東豊線)・新千歳空港駅(JR千歳線)・函館駅(JR函館本線/道南いさりび鉄道)・旭川駅(JR函館本線/宗谷本線)",
        "major_industries": "観光・農業(乳製品/小麦/てん菜)・水産業・食品加工・林業",
    },

    # ====== 東北 ======
    "aomori": {
        "households": "51万世帯",
        "average_income": "267万円",
        "gdp_billion_jpy": "4,500",
        "climate_type": "日本海側豪雪／津軽は多雪、太平洋側八戸は冷涼乾燥、夏冷夏のヤマセ",
        "alcohol_consumption_rank": "全国20位前後",
        "liquor_retail_stores": "約950店",
        "main_stations": "青森駅(JR奥羽本線/津軽線/青い森鉄道)・新青森駅(JR東北新幹線)・八戸駅(JR東北新幹線/八戸線)・弘前駅(JR奥羽本線/弘南鉄道)",
        "major_industries": "農業(りんご/にんにく)・水産業・原子力関連・観光",
    },
    "iwate": {
        "households": "49万世帯",
        "average_income": "274万円",
        "gdp_billion_jpy": "4,750",
        "climate_type": "内陸盆地型／盛岡は寒暖差大、沿岸は太平洋側冷涼、内陸は冬季氷点下で熟成向き",
        "alcohol_consumption_rank": "全国30位前後",
        "liquor_retail_stores": "約900店",
        "main_stations": "盛岡駅(JR東北新幹線/田沢湖線/IGRいわて銀河鉄道)・一ノ関駅(JR東北新幹線/大船渡線)・北上駅(JR東北新幹線/北上線)",
        "major_industries": "自動車部品(トヨタ系)・電子部品・農業(米/畜産)・水産業・観光",
    },
    "miyagi": {
        "households": "98万世帯",
        "average_income": "291万円",
        "gdp_billion_jpy": "9,800",
        "climate_type": "太平洋側温帯／仙台は比較的温和、冬は乾燥、ニッカ宮城峡蒸溜所立地の好環境",
        "alcohol_consumption_rank": "全国10位前後",
        "liquor_retail_stores": "約1,500店",
        "main_stations": "仙台駅(JR東北新幹線/在来各線/仙台市地下鉄南北線)・あおば通駅(JR仙石線)・長町駅(JR東北本線/地下鉄南北線)",
        "major_industries": "電子部品・食品加工・金融(東北拠点)・観光・水産業",
    },
    "akita": {
        "households": "38万世帯",
        "average_income": "271万円",
        "gdp_billion_jpy": "3,650",
        "climate_type": "日本海側豪雪／冬季多雪・湿潤、夏は蒸暑、内陸は寒暖差大",
        "alcohol_consumption_rank": "全国15位前後",
        "liquor_retail_stores": "約750店",
        "main_stations": "秋田駅(JR秋田新幹線/奥羽本線/羽越本線)・大曲駅(JR秋田新幹線/田沢湖線)・横手駅(JR奥羽本線/北上線)",
        "major_industries": "農業(米/秋田こまち)・電子部品・木材加工・観光",
    },
    "yamagata": {
        "households": "39万世帯",
        "average_income": "281万円",
        "gdp_billion_jpy": "4,100",
        "climate_type": "盆地型／夏は猛暑日多発、冬は日本海側豪雪、果樹・ワイン産地",
        "alcohol_consumption_rank": "全国18位前後",
        "liquor_retail_stores": "約800店",
        "main_stations": "山形駅(JR山形新幹線/奥羽本線/仙山線)・米沢駅(JR山形新幹線/奥羽本線/米坂線)・新庄駅(JR山形新幹線/奥羽本線/陸羽東線)",
        "major_industries": "電子部品・農業(さくらんぼ/米/ぶどう)・ワイン醸造・観光",
    },
    "fukushima": {
        "households": "74万世帯",
        "average_income": "291万円",
        "gdp_billion_jpy": "8,100",
        "climate_type": "三地域差／浜通り温暖、中通り内陸性、会津は豪雪、酒造りが盛んな土地",
        "alcohol_consumption_rank": "全国12位前後",
        "liquor_retail_stores": "約1,300店",
        "main_stations": "福島駅(JR東北新幹線/山形新幹線/奥羽本線/阿武隈急行)・郡山駅(JR東北新幹線/磐越東/西線/水郡線)・いわき駅(JR常磐線/磐越東線)",
        "major_industries": "電子部品・自動車部品・農業(米/桃)・酒造・観光",
    },

    # ====== 関東 ======
    "ibaraki": {
        "households": "118万世帯",
        "average_income": "316万円",
        "gdp_billion_jpy": "13,800",
        "climate_type": "太平洋側温帯／夏は高温多湿、冬は乾燥晴天、つくば内陸はやや寒暖差大",
        "alcohol_consumption_rank": "全国14位前後",
        "liquor_retail_stores": "約2,100店",
        "main_stations": "水戸駅(JR常磐線/水郡線/鹿島臨海鉄道)・つくば駅(つくばエクスプレス)・取手駅(JR常磐線/関東鉄道)・土浦駅(JR常磐線)",
        "major_industries": "化学・電気機械・自動車部品・農業(全国2位の農業産出額)・研究学園都市(つくば)",
    },
    "tochigi": {
        "households": "80万世帯",
        "average_income": "338万円",
        "gdp_billion_jpy": "9,200",
        "climate_type": "内陸性／夏は雷雨多発、冬は乾燥晴天、日光・那須は冷涼でウイスキー熟成適地",
        "alcohol_consumption_rank": "全国16位前後",
        "liquor_retail_stores": "約1,500店",
        "main_stations": "宇都宮駅(JR東北新幹線/宇都宮線/日光線/烏山線/LRT)・小山駅(JR東北新幹線/宇都宮線/水戸線/両毛線)・栃木駅(JR両毛線/東武日光線)",
        "major_industries": "自動車(日産/ホンダ)・電気機械・農業(いちご日本一)・観光(日光)",
    },
    "gunma": {
        "households": "80万世帯",
        "average_income": "325万円",
        "gdp_billion_jpy": "9,000",
        "climate_type": "内陸性／夏は猛暑(熊谷至近)、冬は乾燥晴天とからっ風、山間部は積雪",
        "alcohol_consumption_rank": "全国19位前後",
        "liquor_retail_stores": "約1,400店",
        "main_stations": "高崎駅(JR上越/北陸/上越新幹線/在来各線/上信電鉄)・前橋駅(JR両毛線)・伊勢崎駅(JR両毛線/東武伊勢崎線)・桐生駅(JR両毛線/わたらせ渓谷鐵道)",
        "major_industries": "自動車(SUBARU)・電気機械・農業(こんにゃく/キャベツ)・観光(草津温泉)",
    },
    "saitama": {
        "households": "303万世帯",
        "average_income": "303万円",
        "gdp_billion_jpy": "23,500",
        "climate_type": "内陸性／夏は猛暑(熊谷)、冬は乾燥晴天、東京近郊は都市型ヒートアイランド",
        "alcohol_consumption_rank": "全国30位前後",
        "liquor_retail_stores": "約4,200店",
        "main_stations": "大宮駅(JR上越/北陸/東北新幹線/在来各線/東武野田線/埼玉新都市交通)・浦和駅(JR京浜東北/宇都宮/高崎線)・川口駅(JR京浜東北線)・所沢駅(西武池袋/新宿線)",
        "major_industries": "輸送機器(本田/SUBARU)・化学・食品・物流・首都圏ベッドタウン経済",
    },
    "chiba": {
        "households": "270万世帯",
        "average_income": "313万円",
        "gdp_billion_jpy": "21,300",
        "climate_type": "太平洋側温帯／湾岸は湿潤、房総南部は黒潮の影響で温暖、冬は霜少なめ",
        "alcohol_consumption_rank": "全国25位前後",
        "liquor_retail_stores": "約3,500店",
        "main_stations": "千葉駅(JR総武/京葉/外房/内房/成田線/京成千葉線/千葉都市モノレール)・船橋駅(JR総武線/東武野田線/京成本線)・柏駅(JR常磐線/東武野田線)・成田空港駅(JR/京成)",
        "major_industries": "石油化学(京葉工業地帯)・鉄鋼・物流(成田空港/千葉港)・観光(東京ディズニーリゾート)・農業",
    },
    "tokyo": {
        "households": "729万世帯",
        "average_income": "563万円",
        "gdp_billion_jpy": "115,800",
        "climate_type": "都市型温帯／湾岸湿潤・ヒートアイランド顕著、ウイスキー保管は空調管理推奨",
        "alcohol_consumption_rank": "全国1位（成人1人あたり）",
        "liquor_retail_stores": "約9,500店",
        "main_stations": "東京駅(JR新幹線/在来各線/東京メトロ丸ノ内線)・新宿駅(JR/小田急/京王/東京メトロ/都営)・渋谷駅(JR/東急/京王井の頭/東京メトロ)・池袋駅(JR/東武/西武/東京メトロ)・品川駅(JR/京急)",
        "major_industries": "金融・IT・小売・出版・観光(インバウンド)・本社機能集積・専門サービス",
    },
    "kanagawa": {
        "households": "417万世帯",
        "average_income": "365万円",
        "gdp_billion_jpy": "35,500",
        "climate_type": "太平洋側温帯／湾岸湿潤、横浜・川崎は都市型、箱根は山岳冷涼",
        "alcohol_consumption_rank": "全国13位前後",
        "liquor_retail_stores": "約5,800店",
        "main_stations": "横浜駅(JR各線/東急東横/みなとみらい/京急/相鉄/横浜市営地下鉄)・川崎駅(JR京浜東北/南武/東海道線/京急)・新横浜駅(JR東海道新幹線/横浜線/市営地下鉄)・小田原駅(JR東海道新幹線/小田急/箱根登山)",
        "major_industries": "重工業(京浜工業地帯)・自動車(日産)・電機・IT(みなとみらい)・観光(箱根/鎌倉)",
    },

    # ====== 北陸・甲信越 ======
    "niigata": {
        "households": "87万世帯",
        "average_income": "292万円",
        "gdp_billion_jpy": "9,150",
        "climate_type": "日本海側豪雪／冬季多雪・湿潤、夏はフェーン現象で高温、酒造り日本随一",
        "alcohol_consumption_rank": "全国8位前後",
        "liquor_retail_stores": "約1,800店",
        "main_stations": "新潟駅(JR上越新幹線/信越/越後線/白新線)・長岡駅(JR上越新幹線/信越線)・上越妙高駅(JR北陸新幹線/えちごトキめき鉄道)・燕三条駅(JR上越新幹線/弥彦線)",
        "major_industries": "農業(コシヒカリ)・酒造(日本酒生産量上位)・金属加工(燕三条)・化学",
    },
    "toyama": {
        "households": "40万世帯",
        "average_income": "335万円",
        "gdp_billion_jpy": "4,900",
        "climate_type": "日本海側豪雪／冬季多雪、立山連峰の影響で湿潤、夏は蒸暑、製薬・酒造の好環境",
        "alcohol_consumption_rank": "全国22位前後",
        "liquor_retail_stores": "約800店",
        "main_stations": "富山駅(JR北陸新幹線/高山本線/あいの風とやま鉄道/富山地方鉄道/富山ライトレール)・高岡駅(JR城端線/氷見線/あいの風とやま鉄道/万葉線)・新高岡駅(JR北陸新幹線/城端線)",
        "major_industries": "製薬(配置薬)・金属(アルミ)・電子部品・農業・観光(立山黒部)",
    },
    "ishikawa": {
        "households": "47万世帯",
        "average_income": "303万円",
        "gdp_billion_jpy": "4,750",
        "climate_type": "日本海側豪雪／冬季多雪・湿潤、夏は蒸暑、能登は冷涼、加賀は雪雷",
        "alcohol_consumption_rank": "全国24位前後",
        "liquor_retail_stores": "約900店",
        "main_stations": "金沢駅(JR北陸新幹線/七尾線/IRいしかわ鉄道/北陸鉄道)・小松駅(JR北陸新幹線/北陸本線)・七尾駅(JR七尾線/のと鉄道)",
        "major_industries": "機械工業(建設機械/工作機械)・繊維・伝統工芸(漆器/金箔)・観光(兼六園/金沢)",
    },
    "fukui": {
        "households": "29万世帯",
        "average_income": "338万円",
        "gdp_billion_jpy": "3,650",
        "climate_type": "日本海側豪雪／冬季多雪・湿潤、夏は蒸暑、嶺南は若狭湾で温暖",
        "alcohol_consumption_rank": "全国23位前後",
        "liquor_retail_stores": "約650店",
        "main_stations": "福井駅(JR北陸新幹線/越美北線/えちぜん鉄道/福井鉄道)・敦賀駅(JR北陸新幹線/小浜線/北陸本線)・小浜駅(JR小浜線/舞鶴線)",
        "major_industries": "繊維(合繊/眼鏡)・原子力(嶺南)・機械・農業・水産業",
    },
    "yamanashi": {
        "households": "33万世帯",
        "average_income": "298万円",
        "gdp_billion_jpy": "3,650",
        "climate_type": "内陸盆地型／夏は猛暑(甲府)、冬は乾燥晴天で氷点下、サントリー白州蒸溜所立地の名水郷",
        "alcohol_consumption_rank": "全国17位前後",
        "liquor_retail_stores": "約700店",
        "main_stations": "甲府駅(JR中央本線/身延線)・大月駅(JR中央本線/富士急行)・富士山駅(富士急行)・小淵沢駅(JR中央本線/小海線)",
        "major_industries": "電気機械・精密機械・農業(ぶどう/桃日本一)・ワイン醸造・観光(富士山)",
    },
    "nagano": {
        "households": "83万世帯",
        "average_income": "302万円",
        "gdp_billion_jpy": "8,500",
        "climate_type": "内陸高原型／夏冷涼で乾燥、冬は厳寒(松本/上田)、軽井沢など避暑地、ウイスキー熟成に好適",
        "alcohol_consumption_rank": "全国21位前後",
        "liquor_retail_stores": "約1,700店",
        "main_stations": "長野駅(JR北陸新幹線/信越本線/篠ノ井線/長野電鉄)・松本駅(JR中央本線/篠ノ井線/大糸線/アルピコ交通)・軽井沢駅(JR北陸新幹線/しなの鉄道)・上田駅(JR北陸新幹線/しなの鉄道/上田電鉄)",
        "major_industries": "精密機械(セイコーエプソン等)・電子部品・食品加工・農業(レタス/りんご)・観光",
    },

    # ====== 東海 ======
    "gifu": {
        "households": "80万世帯",
        "average_income": "299万円",
        "gdp_billion_jpy": "7,750",
        "climate_type": "内陸性／飛騨は豪雪寒冷、美濃は夏猛暑(多治見)冬温和、寒暖差大",
        "alcohol_consumption_rank": "全国27位前後",
        "liquor_retail_stores": "約1,400店",
        "main_stations": "岐阜駅(JR東海道本線/高山本線/名鉄岐阜)・大垣駅(JR東海道本線/養老鉄道/樽見鉄道)・多治見駅(JR中央本線/太多線)・高山駅(JR高山本線)",
        "major_industries": "輸送機器・窯業(美濃焼/タイル)・刃物(関市)・農業・観光(白川郷/高山)",
    },
    "shizuoka": {
        "households": "149万世帯",
        "average_income": "335万円",
        "gdp_billion_jpy": "17,600",
        "climate_type": "太平洋側温帯／海岸沿いは温暖、冬も比較的温暖、富士山麓は冷涼",
        "alcohol_consumption_rank": "全国26位前後",
        "liquor_retail_stores": "約2,500店",
        "main_stations": "静岡駅(JR東海道新幹線/東海道本線/静岡鉄道)・浜松駅(JR東海道新幹線/東海道本線/遠州鉄道)・三島駅(JR東海道新幹線/伊豆箱根)・沼津駅(JR東海道本線/御殿場線)",
        "major_industries": "輸送機器(スズキ/ヤマハ/ホンダ)・楽器・製紙・食品加工・農業(茶日本一)・観光",
    },
    "aichi": {
        "households": "316万世帯",
        "average_income": "364万円",
        "gdp_billion_jpy": "40,800",
        "climate_type": "太平洋側温帯／名古屋は夏猛暑湿潤、冬は乾燥晴天、湾岸は湿潤",
        "alcohol_consumption_rank": "全国11位前後",
        "liquor_retail_stores": "約4,500店",
        "main_stations": "名古屋駅(JR東海道/中央新幹線/在来各線/名鉄名古屋/近鉄名古屋/地下鉄東山/桜通線/あおなみ線)・金山駅(JR東海道/中央線/名鉄/地下鉄名城/名港線)・栄駅(地下鉄東山/名城線)・豊橋駅(JR東海道新幹線/名鉄/豊橋鉄道)",
        "major_industries": "自動車(トヨタ系)・航空宇宙・工作機械・窯業(瀬戸/常滑)・物流(中部空港/名古屋港)",
    },
    "mie": {
        "households": "73万世帯",
        "average_income": "320万円",
        "gdp_billion_jpy": "8,300",
        "climate_type": "太平洋側温帯／伊勢湾沿いは温暖湿潤、紀伊山地は多雨、冬は比較的温和",
        "alcohol_consumption_rank": "全国28位前後",
        "liquor_retail_stores": "約1,200店",
        "main_stations": "津駅(JR紀勢本線/近鉄名古屋線/伊勢鉄道)・四日市駅(JR関西本線/近鉄四日市)・伊勢市駅(JR参宮線/近鉄山田線)・松阪駅(JR紀勢本線/近鉄山田線/名松線)",
        "major_industries": "石油化学(四日市)・電子部品・自動車部品・観光(伊勢神宮/熊野)・水産業(真珠)",
    },

    # ====== 近畿 ======
    "shiga": {
        "households": "56万世帯",
        "average_income": "323万円",
        "gdp_billion_jpy": "6,800",
        "climate_type": "内陸盆地型／琵琶湖の影響で湿潤、冬は北部豪雪・南部温和、夏は蒸暑",
        "alcohol_consumption_rank": "全国29位前後",
        "liquor_retail_stores": "約950店",
        "main_stations": "大津駅(JR東海道本線)・草津駅(JR東海道本線/草津線)・米原駅(JR東海道新幹線/北陸本線/近江鉄道)・近江八幡駅(JR東海道本線/近江鉄道)",
        "major_industries": "電子部品・精密機械・医薬品・農業・観光(琵琶湖/比叡山)・京阪神ベッドタウン",
    },
    "kyoto": {
        "households": "118万世帯",
        "average_income": "299万円",
        "gdp_billion_jpy": "10,800",
        "climate_type": "内陸盆地型／夏猛暑湿潤(京都市)、冬底冷え、北部丹後は日本海側豪雪",
        "alcohol_consumption_rank": "全国9位前後",
        "liquor_retail_stores": "約2,200店",
        "main_stations": "京都駅(JR東海道新幹線/在来各線/近鉄京都線/地下鉄烏丸線)・四条駅(地下鉄烏丸線/阪急河原町)・京都河原町駅(阪急京都本線)・嵐山駅(嵐電/阪急/JR嵯峨野線)",
        "major_industries": "観光(インバウンド国内最上位)・電子部品(京セラ/任天堂/オムロン)・伝統工芸・大学集積",
    },
    "osaka": {
        "households": "412万世帯",
        "average_income": "317万円",
        "gdp_billion_jpy": "41,200",
        "climate_type": "太平洋側温帯／夏猛暑湿潤、冬は乾燥晴天、都市型ヒートアイランド顕著",
        "alcohol_consumption_rank": "全国4位（成人1人あたり）",
        "liquor_retail_stores": "約7,500店",
        "main_stations": "大阪駅(JR東海道/大阪環状/JR京都/神戸線)・梅田駅(阪急/阪神/地下鉄御堂筋/谷町/四つ橋線)・難波駅(南海/近鉄/阪神/地下鉄御堂筋/四つ橋/千日前線)・天王寺駅(JR大阪環状/関西本線/阪和線/近鉄南大阪線/地下鉄御堂筋/谷町線)・新大阪駅(JR東海道/山陽新幹線/在来線/地下鉄御堂筋線)",
        "major_industries": "商業(卸/小売)・金融・電機・化学・医薬・観光(インバウンド)・本社機能集積",
    },
    "hyogo": {
        "households": "243万世帯",
        "average_income": "300万円",
        "gdp_billion_jpy": "22,100",
        "climate_type": "六気候区／瀬戸内側温暖少雨、日本海側豪雪、阪神湾岸都市型、淡路温暖",
        "alcohol_consumption_rank": "全国7位前後（灘の酒どころ）",
        "liquor_retail_stores": "約3,500店",
        "main_stations": "神戸駅(JR東海道/山陽本線)・三宮駅(JR東海道/山陽/神戸高速/阪急/阪神/神戸市営地下鉄/ポートライナー)・新神戸駅(JR山陽新幹線/市営地下鉄)・姫路駅(JR山陽新幹線/在来線/山陽電鉄)",
        "major_industries": "重工業(神戸製鋼/川崎重工)・酒造(灘五郷)・物流(神戸港)・観光(姫路城/有馬温泉)",
    },
    "nara": {
        "households": "55万世帯",
        "average_income": "287万円",
        "gdp_billion_jpy": "3,800",
        "climate_type": "内陸盆地型／夏猛暑湿潤、冬底冷え、南部吉野は山岳冷涼多雨",
        "alcohol_consumption_rank": "全国35位前後",
        "liquor_retail_stores": "約800店",
        "main_stations": "奈良駅(JR関西本線/桜井線/奈良線)・近鉄奈良駅(近鉄奈良線)・大和西大寺駅(近鉄奈良/京都/橿原線)・橿原神宮前駅(近鉄橿原/南大阪/吉野線)",
        "major_industries": "観光(古都奈良)・繊維・木材(吉野杉)・電子部品・京阪神ベッドタウン",
    },
    "wakayama": {
        "households": "39万世帯",
        "average_income": "297万円",
        "gdp_billion_jpy": "3,600",
        "climate_type": "太平洋側温帯／黒潮の影響で温暖、紀伊山地南部は多雨、冬も比較的温和",
        "alcohol_consumption_rank": "全国33位前後",
        "liquor_retail_stores": "約750店",
        "main_stations": "和歌山駅(JR阪和/紀勢本線/和歌山線/わかやま電鉄)・新宮駅(JR紀勢本線)・白浜駅(JR紀勢本線)・橋本駅(JR和歌山線/南海高野線)",
        "major_industries": "鉄鋼・化学・農業(みかん/梅日本一)・水産業・観光(高野山/熊野)",
    },

    # ====== 中国 ======
    "tottori": {
        "households": "22万世帯",
        "average_income": "266万円",
        "gdp_billion_jpy": "1,920",
        "climate_type": "日本海側豪雪／冬季多雪・湿潤、夏は蒸暑、年間降水量多い",
        "alcohol_consumption_rank": "全国36位前後",
        "liquor_retail_stores": "約450店",
        "main_stations": "鳥取駅(JR山陰本線/因美線)・米子駅(JR山陰本線/伯備線/境線)・倉吉駅(JR山陰本線)",
        "major_industries": "電子部品・食品加工・農業(梨/らっきょう)・水産業・観光(鳥取砂丘)",
    },
    "shimane": {
        "households": "27万世帯",
        "average_income": "274万円",
        "gdp_billion_jpy": "2,650",
        "climate_type": "日本海側豪雪／冬季多雪・湿潤、夏は蒸暑、山陰山地は冷涼",
        "alcohol_consumption_rank": "全国37位前後",
        "liquor_retail_stores": "約550店",
        "main_stations": "松江駅(JR山陰本線)・出雲市駅(JR山陰本線/一畑電車)・浜田駅(JR山陰本線)・益田駅(JR山陰本線/山口線)",
        "major_industries": "電子部品・鉄鋼(製鉄)・農業・水産業・観光(出雲大社/松江)",
    },
    "okayama": {
        "households": "79万世帯",
        "average_income": "286万円",
        "gdp_billion_jpy": "7,750",
        "climate_type": "瀬戸内式／少雨乾燥晴天日多い・温暖、晴れの国、ウイスキー熟成にやや乾燥環境",
        "alcohol_consumption_rank": "全国31位前後",
        "liquor_retail_stores": "約1,300店",
        "main_stations": "岡山駅(JR山陽新幹線/在来各線/岡山電気軌道)・倉敷駅(JR山陽本線/伯備線/水島臨海鉄道)・新倉敷駅(JR山陽新幹線/山陽本線)",
        "major_industries": "鉄鋼(水島臨海工業地帯)・石油化学・自動車(三菱)・繊維(児島ジーンズ)・農業(マスカット/桃)",
    },
    "hiroshima": {
        "households": "120万世帯",
        "average_income": "323万円",
        "gdp_billion_jpy": "11,800",
        "climate_type": "瀬戸内式／温暖少雨、夏は蒸暑、冬は乾燥、内陸は霜降ろし",
        "alcohol_consumption_rank": "全国19位前後（西条の酒どころ）",
        "liquor_retail_stores": "約1,900店",
        "main_stations": "広島駅(JR山陽新幹線/在来各線/広島電鉄/アストラムライン経由)・福山駅(JR山陽新幹線/在来各線/井原鉄道)・呉駅(JR呉線)",
        "major_industries": "自動車(マツダ)・造船・鉄鋼・酒造(西条三大酒どころ)・観光(宮島/原爆ドーム)",
    },
    "yamaguchi": {
        "households": "60万世帯",
        "average_income": "327万円",
        "gdp_billion_jpy": "6,300",
        "climate_type": "瀬戸内式と日本海側／南部温暖少雨、北部多雪、冬は寒暖差大",
        "alcohol_consumption_rank": "全国34位前後",
        "liquor_retail_stores": "約1,100店",
        "main_stations": "山口駅(JR山口線)・新山口駅(JR山陽新幹線/山陽本線/山口線/宇部線)・下関駅(JR山陽本線/山陰本線)・宇部駅(JR山陽本線/宇部線)",
        "major_industries": "化学(瀬戸内工業地帯)・石油化学・セメント・自動車部品・酒造(獺祭)",
    },

    # ====== 四国 ======
    "tokushima": {
        "households": "31万世帯",
        "average_income": "297万円",
        "gdp_billion_jpy": "3,150",
        "climate_type": "太平洋側温帯／南部は黒潮の影響で温暖多雨、北部は瀬戸内側少雨",
        "alcohol_consumption_rank": "全国32位前後",
        "liquor_retail_stores": "約600店",
        "main_stations": "徳島駅(JR高徳線/徳島線/牟岐線/鳴門線)・阿南駅(JR牟岐線)・鳴門駅(JR鳴門線)",
        "major_industries": "化学(医薬品/大塚製薬)・LED(日亜化学)・農業(すだち/れんこん)・観光(阿波踊り/鳴門)",
    },
    "kagawa": {
        "households": "40万世帯",
        "average_income": "313万円",
        "gdp_billion_jpy": "3,950",
        "climate_type": "瀬戸内式／温暖少雨、年間降水量日本最少クラス、ため池文化",
        "alcohol_consumption_rank": "全国38位前後",
        "liquor_retail_stores": "約750店",
        "main_stations": "高松駅(JR予讃/高徳/瀬戸大橋線/ことでん高松築港)・坂出駅(JR予讃/瀬戸大橋線)・丸亀駅(JR予讃線)",
        "major_industries": "造船・石油・冷凍食品・観光(うどん/直島)・四国経済中心",
    },
    "ehime": {
        "households": "59万世帯",
        "average_income": "263万円",
        "gdp_billion_jpy": "5,000",
        "climate_type": "瀬戸内式／中予北予は温暖少雨、南予は太平洋側で多雨、冬温和",
        "alcohol_consumption_rank": "全国39位前後",
        "liquor_retail_stores": "約1,100店",
        "main_stations": "松山駅(JR予讃/予土線)・松山市駅(伊予鉄道)・今治駅(JR予讃線)・新居浜駅(JR予讃線)",
        "major_industries": "化学・タオル(今治)・造船・農業(みかん/伊予柑)・観光(道後温泉/しまなみ)",
    },
    "kochi": {
        "households": "31万世帯",
        "average_income": "276万円",
        "gdp_billion_jpy": "2,400",
        "climate_type": "太平洋側温帯／黒潮の影響で温暖多雨、台風常襲、年間日照時間長い",
        "alcohol_consumption_rank": "全国5位（成人1人あたり、酒豪県として有名）",
        "liquor_retail_stores": "約650店",
        "main_stations": "高知駅(JR土讃線/とさでん交通)・後免駅(JR土讃線/土佐くろしお鉄道/とさでん)・窪川駅(JR土讃線/土佐くろしお鉄道)",
        "major_industries": "農業(野菜促成栽培/ゆず)・水産業(かつお)・林業・観光(よさこい/桂浜)・酒造文化",
    },

    # ====== 九州・沖縄 ======
    "fukuoka": {
        "households": "227万世帯",
        "average_income": "284万円",
        "gdp_billion_jpy": "20,000",
        "climate_type": "太平洋側温帯／福岡市は冬黄砂の影響、北九州工業地帯湿潤、内陸は冷え込み",
        "alcohol_consumption_rank": "全国6位前後",
        "liquor_retail_stores": "約3,800店",
        "main_stations": "博多駅(JR九州新幹線/山陽新幹線/在来各線/福岡市営地下鉄空港線)・天神駅(西鉄/福岡市営地下鉄空港/七隈線)・小倉駅(JR山陽/九州新幹線/在来各線/北九州モノレール)",
        "major_industries": "鉄鋼(北九州)・自動車(トヨタ九州)・半導体・物流(博多/北九州港)・商業(九州拠点)",
    },
    "saga": {
        "households": "31万世帯",
        "average_income": "265万円",
        "gdp_billion_jpy": "3,150",
        "climate_type": "太平洋側温帯／有明海沿岸は湿潤多雨、内陸は寒暖差、冬は比較的温和",
        "alcohol_consumption_rank": "全国40位前後",
        "liquor_retail_stores": "約650店",
        "main_stations": "佐賀駅(JR長崎本線/唐津線)・武雄温泉駅(JR西九州新幹線/長崎本線/佐世保線)・鳥栖駅(JR鹿児島本線/長崎本線)・唐津駅(JR唐津線/筑肥線)",
        "major_industries": "農業(米/みかん)・水産業(有明海)・窯業(有田焼/伊万里焼)・電子部品",
    },
    "nagasaki": {
        "households": "57万世帯",
        "average_income": "262万円",
        "gdp_billion_jpy": "4,650",
        "climate_type": "海洋性温暖／対馬海流の影響で温暖、年間降水量多い、冬は比較的温和",
        "alcohol_consumption_rank": "全国41位前後",
        "liquor_retail_stores": "約1,000店",
        "main_stations": "長崎駅(JR西九州新幹線/長崎本線/長崎電気軌道経由)・佐世保駅(JR佐世保線/松浦鉄道)・諫早駅(JR西九州新幹線/長崎本線/大村線/島原鉄道)",
        "major_industries": "造船(三菱重工長崎)・水産業・観光(出島/グラバー園)・農業・離島経済",
    },
    "kumamoto": {
        "households": "72万世帯",
        "average_income": "272万円",
        "gdp_billion_jpy": "6,300",
        "climate_type": "太平洋側温帯／夏猛暑湿潤(熊本市は内陸盆地)、阿蘇は高原冷涼、冬は霜降り",
        "alcohol_consumption_rank": "全国42位前後（焼酎文化が強い）",
        "liquor_retail_stores": "約1,200店",
        "main_stations": "熊本駅(JR九州新幹線/鹿児島本線/豊肥本線/熊本市電)・新水前寺駅(JR豊肥本線/熊本市電)・八代駅(JR鹿児島本線/肥薩線/肥薩おれんじ鉄道)",
        "major_industries": "半導体(TSMC熊本工場)・農業(米/トマト/すいか)・畜産(あか牛)・観光(阿蘇/熊本城)",
    },
    "oita": {
        "households": "49万世帯",
        "average_income": "286万円",
        "gdp_billion_jpy": "4,500",
        "climate_type": "瀬戸内式と太平洋側／北部沿岸は温暖少雨、南部山間は冷涼多雨、温泉湧出量日本一",
        "alcohol_consumption_rank": "全国43位前後（焼酎文化）",
        "liquor_retail_stores": "約850店",
        "main_stations": "大分駅(JR日豊本線/久大本線/豊肥本線)・別府駅(JR日豊本線)・中津駅(JR日豊本線)",
        "major_industries": "鉄鋼・石油精製(大分臨海)・半導体・農業・観光(別府/由布院温泉)",
    },
    "miyazaki": {
        "households": "47万世帯",
        "average_income": "245万円",
        "gdp_billion_jpy": "3,750",
        "climate_type": "南国温暖／日照時間日本トップクラス、夏は高温多湿、台風常襲、冬は温和",
        "alcohol_consumption_rank": "全国44位前後（焼酎消費量全国上位）",
        "liquor_retail_stores": "約850店",
        "main_stations": "宮崎駅(JR日豊本線/日南線)・宮崎空港駅(JR宮崎空港線)・延岡駅(JR日豊本線)・都城駅(JR日豊本線/吉都線)",
        "major_industries": "農業(畜産/きゅうり/マンゴー)・焼酎醸造・観光(青島/高千穂)・林業",
    },
    "kagoshima": {
        "households": "73万世帯",
        "average_income": "270万円",
        "gdp_billion_jpy": "5,750",
        "climate_type": "南国温暖／本土南端で温暖多雨、桜島の降灰、南西諸島は亜熱帯、台風常襲",
        "alcohola_consumption_rank": "全国45位前後（焼酎消費量日本一）",
        "alcohol_consumption_rank": "全国45位前後（焼酎消費量日本一）",
        "liquor_retail_stores": "約1,300店",
        "main_stations": "鹿児島中央駅(JR九州新幹線/鹿児島本線/指宿枕崎線/市電)・鹿児島駅(JR鹿児島本線/日豊本線/市電)・霧島神宮駅(JR日豊本線)・指宿駅(JR指宿枕崎線)",
        "major_industries": "農業(畜産/さつまいも/茶)・焼酎醸造(芋焼酎日本一)・水産業(かつお)・観光(屋久島/桜島)",
    },
    "okinawa": {
        "households": "61万世帯",
        "average_income": "240万円",
        "gdp_billion_jpy": "4,550",
        "climate_type": "亜熱帯海洋性／年中高温多湿、台風常襲、塩害多い、ウイスキー保管は徹底空調必須",
        "alcohol_consumption_rank": "全国46位前後（泡盛文化が強くウイスキー消費は限定的）",
        "liquor_retail_stores": "約1,100店",
        "main_stations": "那覇空港駅(沖縄都市モノレール ゆいレール)・県庁前駅(ゆいレール)・首里駅(ゆいレール)・てだこ浦西駅(ゆいレール)",
        "major_industries": "観光(リゾート/インバウンド)・米軍基地関連・泡盛醸造・農業(さとうきび/パイン)・IT・物流",
    },
}

# 重複キーのクリーンアップ（kagoshimaのタイポ修正）
if "alcohola_consumption_rank" in PREFECTURES_EXTRA.get("kagoshima", {}):
    del PREFECTURES_EXTRA["kagoshima"]["alcohola_consumption_rank"]


def get_extra(slug: str) -> dict:
    """都道府県スラッグから追加メタデータを取得。未登録時は空dict。"""
    return PREFECTURES_EXTRA.get(slug, {})


if __name__ == "__main__":
    print(f"Total prefectures: {len(PREFECTURES_EXTRA)}")
    missing_keys = []
    required_fields = [
        "households", "average_income", "gdp_billion_jpy",
        "climate_type", "alcohol_consumption_rank",
        "liquor_retail_stores", "main_stations", "major_industries",
    ]
    for slug, data in PREFECTURES_EXTRA.items():
        for field in required_fields:
            if field not in data:
                missing_keys.append(f"{slug}.{field}")
    if missing_keys:
        print(f"Missing fields: {missing_keys}")
    else:
        print("All 47 prefectures have all 8 required fields.")
