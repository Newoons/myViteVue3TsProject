export default {
    namespaced: true,
    state: {
        tagViewList: [],//顶部已打开路由列表
        selectedTab: '',//已选中页面
    },
    getters: {
    },
    mutations: {
        changeTagList(state: any, curRoute: any) {
            let isExist: boolean = false
            state.tagViewList.forEach((element: any) => {
                if (element.name === curRoute.name) {
                    isExist = true
                }
            });
            if (!isExist) {
                state.tagViewList.push(curRoute)
            }
            state.selectedTab = curRoute.name
            // console.log(state.tagViewList,'list')
            // sessionStorage.setItem('tagViewList',state.tagViewList)
        },
        updateTagViewList(state: any, newValue: any) {
            state.tagViewList = newValue
        },
    },
    actions: {
    },
}