export type Drink = {
  name: string;
  japaneseName: string;
  required: number;
  memo?: string;
  quantity?: string;
}

export const Drinks:Drink[] = [
  {
    name: "KELSH",
    japaneseName: "ケルシュ 青 (10)",
    required: 20,
  },
  {
    name: "ALT",
    japaneseName: "アルト 赤 (10)",
    required: 20,
  },
  {
    name: "MATCHA",
    japaneseName: "抹茶ビール(5)",
    required: 20,
  },
  {
    name: "JUNMAISHU",
    japaneseName: "京の地酒 純米酒(5)",
    required: 10,
  },
  {
    name: "ASAHI_SUPER_DRY",
    japaneseName: "アサヒ(10)",
    required: 10,
  },
  {
    name: "YUZU_CHUHAI",
    japaneseName: "柚子チューハイ(5)",
    required: 10,
  },
  {
    name: "UME_CHUHAI",
    japaneseName: "梅チューハイ(5)",
    required: 10,
  },
  {
    name: "GYOKURO_UMESHU",
    japaneseName: "玉露梅酒(5)",
    required: 10,
  },
  {
    name: "HANNARI_UMESHU",
    japaneseName: "京はんなり梅酒(5)",
    required: 10,
  },
  {
    name: "YUZU_CIDER",
    japaneseName: "ゆずサイダー(10)",
    required: 15,
  },
  {
    name: "COLA",
    japaneseName: "コーラ(10)",
    required: 10,
  },
  {
    name: "ALL_FREE",
    japaneseName: "オールフリー(8)",
    required: 10,
  },
  {
    name: "JURAKUDAI",
    japaneseName: "聚楽第(1)",
    required: 1,
  },
  {
    name: "KINSHIMASAMUNE",
    japaneseName: "金鵄政宗(1)",
    required: 1,
  },
  {
    name: "TAMAGAWA",
    japaneseName: "玉川(1)",
    required: 1,
  },
  {
    name: "GESSHOU",
    japaneseName: "げっしょう(1)",
    required: 1,
  },
  {
    name: "ORANGE",
    japaneseName: "オレンジジュース(2/3)",
    required: 2,
  },
];