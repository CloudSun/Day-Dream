var AlbumWall = {
    Album: {
        CoverList: [
            {
                title: "album1",
                image: {
                    src: "album/cover/photo1.jpg",
                    width: 440,
                    height: 657,
                },
                createtime: "20131105",
                updatetime: "20131105",
                pagesize: 1,
            }, {
                title: "album2",
                image: {
                    src: "album/cover/photo2.jpg",
                    width: 440,
                    height: 435,
                },
                createtime: "20131203",
                updatetime: "20131203",
                pagesize: 1,
            }, {
                title: "album3",
                image: {
                    src: "album/cover/photo3.jpg",
                    width: 290,
                    height: 276,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album4",
                image: {
                    src: "album/cover/photo4.jpg",
                    width: 347,
                    height: 267,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album5",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 314,
                    height: 424,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }],
        //分割后的PageList
        PageList: new Array(),
    },
    Setting: {
        WallPageSizeMax: 20,
        CoverSizeMin: { width: 70, height: 70 },
        BorderWidth: 10,
    },
    Wall: {
        target: $(".album-wall"),
        size: {
            width: function() {
                return AlbumWall.Wall.target.width();
            },
            height: function() {
                return AlbumWall.Wall.target.height();
            },
            area: function() {
                return AlbumWall.Wall.target.width() * AlbumWall.Wall.target.height();
            },
        },
    },
    Init: function() {
        var _this = this;
        var coverList = _this.Album.CoverList.slice();
        //添加计算的area图片面积
        coverList = coverList.each(function(a, i) {
            var cover = a;
            //原图片面积
            cover.image.area = cover.image.width * cover.image.height;
            //添加border后面积
            cover.image.border_area = (cover.image.width + 2 * AlbumWall.Setting.BorderWidth) * (cover.image.height + 2 * AlbumWall.Setting.BorderWidth);
            return cover;
        });
        //albumList 重排
        //排列优先级 1,upadate;2,pagesize;3,create;4,image.area
        coverList.sort(function(a, b) {
            //a在前，返回负数
            //b在前,返回正数
            //0，不变
            if (a.updatetime > b.updatetime) { //a最新更新
                return -1;
            } else if (a.updatetime == b.updatetime) {
                if (a.pagesize > b.pagesize) {
                    return -1;
                } else if (a.pagesize == b.pagesize) {
                    if (a.create > b.create) {
                        return -1;
                    } else if (a.create == b.create) {
                        if (a.image.area > b.image.area) {
                            return -1;
                        } else if (a.image.area == b.image.area) {
                            return 0;
                        } else {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                } else {
                    return 1;
                }
            } else {
                return 1;
            }
        });

        //split coverlist by wall pagesize 根据pageSize分割albumWall
        var pageLength = Math.ceil(coverList.length / _this.Setting.WallPageSizeMax);
        for (var i = 0; i < pageLength; i++) {
            var list = coverList.splice(0, 20);
            //get page album-border sum area
            var albumBorderSumArea = 0;
            list.each(function(o, j) {
                albumBorderSumArea += o.image.border_area;
            });
            var target = {
                list: list,
                border_sum_area: albumBorderSumArea,
            };
            //根据WallSizeArea resize;
            _this.Album.PageList.push(target);
        }
    },
};

AlbumWall.Init();