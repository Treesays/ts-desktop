
const fetchCategoryStats = (whichCategory) => {
    const query = new AV.Query('CagegoryStats');
    return query.first(query.equalTo('name', whichCategory));
}
const followUnfollow = (whichCategory, userId) => {
    return new AV.Query('cateTest').get('5deb9bdcfbf47f0067477d96')
        .then(async (data) => {
            const target = AV.Object.createWithoutData('cateTest', '5deb9bdcfbf47f0067477d96');
            const index = data.attributes.followers.indexOf(userId);
            index < 0 ? data.attributes.followers.push(userId): data.attributes.followers.splice(index, 1);
            target.set('followers', data.attributes.followers);
            try {
               const result = await target.save({fetchWhenSave: true});
               return { result, index };
            } catch(e) {
                return { 'error': e };
            }
        });
}
export {
    fetchCategoryStats,
    followUnfollow,
}
