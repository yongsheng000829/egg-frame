let initState = {
    list: [
        {
            des: "还没做完呢",
            id: 16,
            name: "红叶",
            qqnumber: "939996573",
            time: "2020/2/12 上午3:03:03",
            title: "测试一下",
            type: "多选",
            username: "bbl",
        },
        {
            des: "看看今晚几点睡觉",
            id: 17,
            name: "红叶",
            qqnumber: "939996573",
            time: "2020/2/11 上午5:05:05",
            title: "明天几点起来",
            type: "多选",
            username: "bbl",
        },
        {
            des: "试试吧",
            id: 18,
            name: "红叶",
            qqnumber: "939996573",
            time: "2020/2/11 上午3:03:03",
            title: "用户只能投票一次",
            type: "多选",
            username: "bbl",
        }
    ],
    tagList: [],
    data: []
}
let actions = {
    SAVE_LIST(state, action) {
        state.list = action.val;
    },
    SAVE_TAG(state, action) {
        state.tagList = action.val
    },
    SET_STATE(state, { val }) {
        state.tagList.forEach(v => {
            if (v.id === val.id) {
                if (val.flag) {
                    let time = new Date().toLocaleString();
                    v.time = time;
                    v.num++;
                    return
                }
                v.time = '';
                v.num--
            }
        })
    },
    SET_DATA(state, { val }) {
        state.data = val;
    }
}
export default function reducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    actions[action.type] && actions[action.type](newState, action);
    return newState
}