const getTotalPage = (totalCount, pageSize) => {
    let totalPage = (totalCount / pageSize);
    if ((totalCount % pageSize) != 0) {
        totalPage += 1;
    }
    return totalPage;
};

module.exports = {
    getTotalPage,
};