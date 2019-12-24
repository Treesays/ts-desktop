const categoryMapping = {
    'GeekCode': '5deb349dfbf47f006742a3ee',
    'GeekToBuy': '5deb3b65fc36ed0068604fbb',
    'GeekTalk': '5deb3b3bfbf47f006742f037',
    'GeekLove': '5deb3566fbf47f006742ad28'
}
const fetchCategoryStats = (whichCategory) => {
    const query = new AV.Query('CagegoryStats');
    return query.first(query.equalTo('name', whichCategory));
}
const fetchPostsByCategory = (whichCategory,limitNum,skipNum) => {
    const query = new AV.Query('Posts');
    return query.find(query.equalTo('category', whichCategory ).limit(limitNum).skip(skipNum));
}
const followUnfollow = (whichCategory, userId) => {
    const categoryId = categoryMapping[whichCategory];
    return new AV.Query('CagegoryStats').get(categoryId)
        .then(async (data) => {
            const target = AV.Object.createWithoutData('CagegoryStats', categoryId);
            const index = data.attributes.followers.indexOf(userId);
            index < 0 ? data.attributes.followers.push(userId) : data.attributes.followers.splice(index, 1);
            target.set('followers', data.attributes.followers);
            try {
                const result = await target.save({ fetchWhenSave: true });
                return { result, index };
            } catch (e) {
                return { 'error': e };
            }
        });
}
const isUserFollowedCategory = (whichCategory, userId) => {
    return new AV.Query('CagegoryStats').get(categoryMapping[whichCategory])
        .then((data) => {
            return data.attributes.followers.indexOf(userId) > -1;
        })
}
const getListbyCategory = (whichCategory) => {
    const query = new AV.Query('Posts')
    return query.find(query.equalTo('category', whichCategory ).limit(1).skip(2))
}
export {
    fetchCategoryStats,
    fetchPostsByCategory,
    followUnfollow,
    getListbyCategory,
    isUserFollowedCategory
}
