export type Equipment = {
  name: string;
  japaneseName: string; 
  required: string;
  quantity?: number;
}

export const Equipments: Equipment[] = [
    {name:"CHOPSTICKS",          japaneseName:"箸",                required:"8袋",},
    {name:"CHOPSTICKS_BAG",      japaneseName:"箸袋",              required:"10袋",},
    {name:"WET_TOWEL",           japaneseName:"おしぼり",          required:"2袋",},
    {name:"TOILET_PAPER",        japaneseName:"トイレットペーパー", required:"3袋",},
    {name:"STRAW",               japaneseName:"ストロー",          required:"5袋",},
    {name:"BLACK_BAG",           japaneseName:"汚物袋(黒)",        required:"1箱",},
    {name:"ALCOHOL_PAPER",       japaneseName:"アルコールペーパー", required:"10袋",},
    {name:"TUMAYOUZI",           japaneseName:"つまようじ",        required:"1箱",},
    {name:"ITTOCO",              japaneseName:"イットコ",          required:"10個",},
    {name:"CHILDREN_CHOPSTICKS", japaneseName:"子割りばし",        required:"1袋",},
    {name:"TOILET_QUICKLE",      japaneseName:"トイレクイックル",   required:"5袋",},
    {name:"HURIKAKE",            japaneseName:"ふりかけ",          required:"1/2袋",},
]