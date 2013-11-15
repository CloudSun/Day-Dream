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
        CoverSizeMin: { width: 50, height: 50 },//add 2*BorderWidth == 70
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
    //坐标轴
    Axis: {
        width_scale: 1,
        height_scale: 1,
        width: 0,
        height: 0,
        origin: { //原点
            x: 0,
            y: 0,
        }
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
            var list = coverList.splice(0, _this.Setting.WallPageSizeMax);
            //get page album-border sum area
            var albumBorderSumArea = 0;
            list.each(function(o, j) {
                albumBorderSumArea += o.image.border_area;
            });
            var wallSizeArea = _this.Wall.size.area();
            var resizeBorderArea = 0;
            if (albumBorderSumArea > wallSizeArea) {
                //如果albumSize > average album size && the album size/ (albumBorderSumArea/_this.Wall.size.area())
                var averageSize = wallSizeArea / list.length;
                var areaScale = Math.sqrt(wallSizeArea / albumBorderSumArea);
                list.each(function (o, j,averageSize,areaScale) {
                    var resizeWidth = 0;
                    var resizeHeight = 0;
                    if (o.image.border_area > averageSize) {
                        resizeWidth = o.image.width * areaScale;
                        resizeHeight = o.image.height * areaScale;
                    } else {
                        resizeWidth = o.image.width;
                        resizeHeight = o.image.height;
                    }
                    
                    o.image.resize_width = resizeWidth;
                    o.image.resize_height = resizeHeight;
                    o.image.resize_border_area = (resizeWidth + 2 * _this.Setting.BorderWidth) * (resizeHeight + 2 * _this.Setting.BorderWidth);
                    resizeBorderArea += o.image.resize_border_area;
                    return o;
                }, averageSize, areaScale);

                //TODO
                //仍然会有放不下的情况？

                console.log("realBorderSizeArea="+albumBorderSumArea+" resizeBorderArea=" + resizeBorderArea + " wallSizeArea=" + wallSizeArea);
            }
            var target = {
                list: list,
                border_sum_area: albumBorderSumArea,
            };
            //根据WallSizeArea resize;
            _this.Album.PageList.push(target);
        }

        //2 构建Wall 直角坐标轴
        var wallWidth = _this.Wall.size.width();
        var wallHeight = _this.Wall.size.height();
        if (wallWidth > wallHeight) {
            _this.Axis.width_scale = wallHeight / wallWidth;
        } else {
            _this.Axis.height_scale = wallWidth / wallHeight;
        }
        //原点坐标
        //偏正为正方形的坐标系原点
        _this.Axis.origin.x = _this.Axis.origin.y = Math.min(wallWidth, wallHeight) / 2;
        //init location to put the album
        _this.Axis.baseline = new Array();
        
        //PageList[0] albumList
        var albumList = _this.Album.PageList[0].list.slice();
        
        //resize the album size according to the width_scale & height_scale 
        albumList = albumList.each(function (a, i) {
            a.image.axis_width = a.image.resize_width * AlbumWall.Axis.width_scale;
            a.image.axis_height = a.image.resize_height * AlbumWall.Axis.height_scale;
            return a;
        });

        //获取Baseline
        //[1]:无baseline的情况
        if (_this.Axis.baseline.length == 0) {
            var album = albumList.splice(0,1);
            //取坐标系-x方向为album上下对称点且右边对齐y轴
            album.image.axis = {
                border: {
                    top: {
                        y: album.image.axis_height / 2,
                        limit: [-album.image.axis_width, 0],
                    },
                    right: {
                        x: 0,
                        limit: [-album.image.axis_height / 2, album.image.axis_height / 2],
                    },
                    bottom: {
                        y: -album.image.axis_height / 2,
                        limit: [-album.image.axis_width / 2, album.image.axis_width / 2],

                    },
                    left: {
                        x: -album.image.axis_width,
                        limit: [-album.image.axis_height / 2, album.image.axis_height / 2],

                    },
                },
            }
            var axisLocation = getAxisLocation(album.image.axis.border);
            function getAxisLocation(border) {
                var top = 0;
                var left = 0;
                top = AlbumWall.Axis.origin.y - border.top.y;
                left = AlbumWall.Axis.origin.x - border.left.x;
                return location = {
                    top: top,
                    left: left,
                }
            }
            album.image.axis.location = {
                top:album.image.axis
            };
        }


        //获取CrossPoint

    },
};

AlbumWall.Init();