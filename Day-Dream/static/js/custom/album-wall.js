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
            }, {
                title: "album6",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 214,
                    height: 224,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album7",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 114,
                    height: 124,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album8",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 314,
                    height: 124,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album9",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 84,
                    height: 124,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album10",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 84,
                    height: 84,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album11",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 384,
                    height: 124,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album12",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 84,
                    height: 84,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album13",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 224,
                    height: 154,
                },
                createtime: "20131201",
                updatetime: "20131201",
                pagesize: 1,
            }, {
                title: "album14",
                image: {
                    src: "album/cover/photo5.jpg",
                    width: 584,
                    height: 524,
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
        //原点
        origin: {
            x: 0,
            y: 0,
        },
        Baseline: new Array(),
        OutBaseline: new Array(),
        CrossPoint: new Array(),
        OutCrossPoint: new Array(),
        Sac: new Array(),//死巷，凹区间块
        Content: new Array(),
        AutoContent: new Array(),//无填充死巷的自动填充块
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
            
            if (a.image.area > b.image.area) {
                    return -1;
                } else if (a.image.area == b.image.area) {
                    return 0;
                } else {
                    return 1;
                }
            
            /*
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
            */
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
                var averageSize = toFixed(wallSizeArea / list.length);
                var areaScale = toFixed(Math.sqrt(wallSizeArea / albumBorderSumArea));
                list.each(function(o, j, averageSize, areaScale) {
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
                console.log("realBorderSizeArea=" + albumBorderSumArea + " resizeBorderArea=" + resizeBorderArea + " wallSizeArea=" + wallSizeArea);
            } else {
                var averageSize = toFixed(wallSizeArea / list.length);
                list.each(function(o, j, averageSize) {
                    var resizeWidth = 0;
                    var resizeHeight = 0;
                    if (o.image.border_area > averageSize) {
                        resizeWidth = o.image.width * toFixed(Math.sqrt(toFixed(averageSize / o.image.border_area)));
                        resizeHeight = o.image.height * toFixed(Math.sqrt(toFixed(averageSize / o.image.border_area)));
                    } else {
                        resizeWidth = o.image.width;
                        resizeHeight = o.image.height;
                    }

                    o.image.resize_width = resizeWidth;
                    o.image.resize_height = resizeHeight;
                    o.image.resize_border_area = (resizeWidth + 2 * _this.Setting.BorderWidth) * (resizeHeight + 2 * _this.Setting.BorderWidth);
                    resizeBorderArea += o.image.resize_border_area;
                    return o;
                }, averageSize);
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
            _this.Axis.width_scale = toFixed(wallHeight / wallWidth);
        } else {
            _this.Axis.height_scale = toFixed(wallWidth / wallHeight);
        }
        //原点坐标
        //偏正为正方形的坐标系原点
        _this.Axis.origin.x = _this.Axis.origin.y = toFixed(Math.min(wallWidth, wallHeight) / 2);
        _this.Axis.width = _this.Axis.origin.x * 2;
        _this.Axis.height = _this.Axis.origin.y * 2;
        //init location to put the album
        _this.Axis.baseline = new Array();

        //PageList[0] albumList
        var albumList = _this.Album.PageList[0].list.slice();

        //resize the album size according to the width_scale & height_scale 
        albumList = albumList.each(function(a) {
            a.image.axis_width = toFixed(a.image.resize_width * AlbumWall.Axis.width_scale);
            a.image.axis_height = toFixed(a.image.resize_height * AlbumWall.Axis.height_scale);
            return a;
        });
        //获取Baseline
        caculateAlbumArrange(albumList);

        function caculateAlbumArrange(albumList) {
            (!album || !isArray(albumList) || album.length == 0) && (function() {
                throw Exception;
                return null;
            });
            var album = albumList.splice(0, 1)[0];
            //[1]:无baseline的情况
            if (AlbumWall.Axis.OutBaseline.length == 0 && AlbumWall.Axis.CrossPoint.length == 0) {
                //取坐标系-x方向为album上下对称点且右边对齐y轴
                album.image.axis = {};
                album.image.axis.location = {
                    x: -album.image.axis_width,
                    y: toFixed((album.image.axis_height / 2),4),
                };

                album.image.axis.border = getAxisImageBorder(album.image);

                //test
                var baseline = borderToBaseline(album.image.axis.border);
                if (validateBaseline(baseline)) {
                    addBaseLine(baseline);
                    //完成本次排列
                    afterArrange(album, albumList);
                }

                //无CrossPoint，有baseline的情况
            } else if (AlbumWall.Axis.OutBaseline.length != 0 || AlbumWall.Axis.CrossPoint.length != 0) {
                //根据_this.Axis.Baseline
                if (validateBaseline(AlbumWall.Axis.Baseline)) {
                    //get the baseline center point and the distance to the origin point
                    var outBaselineCenter = AlbumWall.Axis.OutBaseline.each(function (b, i) {
                        var x = toFixed((b.from.x + b.to.x) / 2);
                        var y = toFixed((b.from.y + b.to.y) / 2);
                        b.type = "out-baseline-center";
                        b.distance = Math.pow(x, 2) + Math.pow(y, 2);
                        b.center = {
                            x: x,
                            y: y,
                        };
                        return b;
                    });

                    //根据AlbumWall.Axis.CrossPoint
                    //get the baseline center point and the distance to the origin point
                    var crossPointArray = AlbumWall.Axis.CrossPoint.each(function(b) {
                        var x = b.point.x;
                        var y = b.point.y;
                        b.distance = Math.pow(x, 2) + Math.pow(y, 2);
                        b.type = "cross-point";
                        return b;
                    });
                    var conditionList = new Array();
                    conditionList.pushArray(outBaselineCenter);
                    conditionList.pushArray(crossPointArray);
                    conditionList.sort(function(a, b) {
                        //a在前，返回负数
                        //b在前,返回正数
                        //0，不变
                        if (a.distance < b.distance) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });

                    var condition = null;
                    if (conditionList && conditionList.length > 0) {
                        condition = conditionList[0];
                    } else {
                        throw Exception;
                        return null;
                    }

                    if (condition.type == "out-baseline-center") {
                        //if is baselineCenter;
                        var targetBaseline = condition;
                        album.image.axis = {};
                        switch (targetBaseline.space) {
                        case "y":
                            album.image.axis.location = {
                                x: toFixed(targetBaseline.center.x - toFixed(album.image.axis_width / 2)),
                                y: toFixed(targetBaseline.center.y + album.image.axis_height),
                            };
                            break;
                        case "-y":
                            album.image.axis.location = {
                                x: toFixed(targetBaseline.center.x - toFixed(album.image.axis_width / 2)),
                                y: targetBaseline.center.y,
                            };
                            break;
                        case "x":
                            album.image.axis.location = {
                                x: targetBaseline.center.x,
                                y: toFixed(targetBaseline.center.y + toFixed(album.image.axis_height / 2)),
                            };
                            break;
                        case "-x":
                            album.image.axis.location = {
                                x: toFixed(targetBaseline.center.x - album.image.axis_width),
                                y: toFixed(targetBaseline.center.y + toFixed(album.image.axis_height / 2)),
                            };
                            break;
                        }

                        album.image.axis.border = getAxisImageBorder(album.image);

                        //test
                        var baseline = borderToBaseline(album.image.axis.border);
                        if (validateBaseline(baseline)) {
                            //添加并且整合AlbumWall.Axis.Baseline
                            addBaseLine(baseline);
                            //完成本次排列
                            afterArrange(album, albumList);
                        }
                    } else if (condition.type == "cross-point") {
                        var targetCrossPoint = condition;
                        var widthAvailable = function(crossPoint, album) {
                            if (!crossPoint.limit_x ||
                                (crossPoint.limit_x && crossPoint.limit_x >= album.image.axis_width)) {
                                return true;
                            } else {
                                return false;
                            }
                        };

                        var heightAvailable = function(crossPoint, album) {
                            if (!crossPoint.limit_y ||
                                (crossPoint.limit_y && crossPoint.limit_y >= album.image.axis_height)) {
                                //y轴方向 纵向 高度 可置
                                return true;
                            } else {
                                return false;
                            }
                        };

                        //if space available and add in;

                        if (widthAvailable(targetCrossPoint, album) && heightAvailable(targetCrossPoint, album)) {
                            addAlbum(album, albumList, targetCrossPoint);
                        } else {
                            //get other avaliable album to put in
                            for (var j = 0; j < albumList.length; j++) {
                                if (widthAvailable(targetCrossPoint, albumList[i]) && heightAvailable(targetCrossPoint, albumList[i])) {
                                    var otheralbum = albumList.getIndex(i);
                                    addAlbum(otheralbum, albumList, targetCrossPoint);
                                } else {
                                    if (j == albumList.length - 1) {
                                        //put an autoContent in;
                                        var autoWidth = 0;
                                        var autoHeight = 0;
                                        if (targetCrossPoint.limit_x) {
                                            autoWidth = targetCrossPoint.limit_x;
                                            autoHeight = targetCrossPoint.space_y_length;
                                        } else {
                                            autoHeight = targetCrossPoint.limit_y;
                                            autoWidth = targetCrossPoint.space_x_length;
                                        }

                                        var autoContentAlbum = {
                                            type: "auto",
                                            image: {
                                                axis_height: autoHeight,
                                                axis_width: autoWidth,
                                            }
                                        };
                                        addAlbum(autoContentAlbum, albumList, targetCrossPoint);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        function afterArrange(album, albumList) {
            //添加到最终内容Content
            AlbumWall.Axis.Content.push(album);
            drawAlbum(album);
            AlbumWall.Axis.CrossPoint = getCrossPoint(AlbumWall.Axis.Baseline);
            AlbumWall.Axis.OutCrossPoint = getOutCrossPoint(AlbumWall.Axis.Baseline);
            AlbumWall.Axis.OutBaseline = getOutBaseline(AlbumWall.Axis.OutCrossPoint);
            AlbumWall.Axis.CrossPoint = getSac(AlbumWall.Axis.CrossPoint);
            if (albumList.length > 0) {
                caculateAlbumArrange(albumList);
            } else {
                //arrange complete

                //TODO
                //判断baseline，判断最左baseline和最右baseline之间的距离，>AlbumWall.Axis.width
                //获取最左边
                var leftBaseline, rightBaseline, topBaseline, bottomBaseline;
                for (var i = 0; i < AlbumWall.Axis.Baseline.length; i++) {
                    var b = AlbumWall.Axis.Baseline[i];
                    switch (b.space) {
                        case "x"://rightborder
                            if (!rightBaseline || (rightBaseline && rightBaseline.x < b.x)) {
                                rightBaseline = b;
                            }
                            break;
                        case "-x"://leftborder
                            if (!leftBaseline || (leftBaseline && leftBaseline.x > b.x)) {
                                leftBaseline = b;
                            }
                            break;
                        case "y"://topborder
                            if (!topBaseline || (topBaseline && topBaseline.y < b.y)) {
                                topBaseline = b;
                            }
                            break;
                        case "-y"://bottomborder
                            if (!bottomBaseline || (bottomBaseline && bottomBaseline.y > b.y)) {
                                bottomBaseline = b;
                            }
                            break;
                    }
                }
                var borderWidth, borderHeight;
                if (leftBaseline && rightBaseline && topBaseline && bottomBaseline) {
                    borderWidth = Math.abs(rightBaseline.x - leftBaseline.x);
                    borderHeight = Math.abs(topBaseline.y - bottomBaseline.y)
                } else {
                    throw exception;
                }
                //
            }
        }

        function addAlbum(album, albumList, targetCrossPoint) {
            album.image.axis = {};
            var spaceStr = targetCrossPoint.space_x + targetCrossPoint.space_y;
            switch (spaceStr) {
                case "xy":
                    //第一象限
                    album.image.axis.location = {
                        x: targetCrossPoint.point.x,
                        y: toFixed(targetCrossPoint.point.y + album.image.axis_height),
                    };
                    break;
                case "x-y":
                    //第二象限
                    album.image.axis.location = {
                        x: targetCrossPoint.point.x,
                        y: targetCrossPoint.point.y,
                    };
                    break;
                case "-x-y":
                    //第三象限
                    album.image.axis.location = {
                        x: toFixed(targetCrossPoint.point.x - album.image.axis_width),
                        y: targetCrossPoint.point.y,
                    };
                    break;
                case "-xy":
                    //第四象限
                    album.image.axis.location = {
                        x: toFixed(targetCrossPoint.point.x - album.image.axis_width),
                        y: toFixed(targetCrossPoint.point.y + album.image.axis_height),
                    };
                    break;
            }

            album.image.axis.border = getAxisImageBorder(album.image);
            //test
            var baseline = borderToBaseline(album.image.axis.border);
            if (validateBaseline(baseline)) {
                //添加并且整合AlbumWall.Axis.Baseline
                addBaseLine(baseline);
                //完成本次排列
                afterArrange(album, albumList);
            }
        }

        function drawAlbum(album) {
            var albumWidth = album.image.axis_width / AlbumWall.Axis.width_scale;
            var albumHeight = album.image.axis_height / AlbumWall.Axis.height_scale;
            var albumTop = (AlbumWall.Axis.origin.y - album.image.axis.location.y) / AlbumWall.Axis.height_scale;
            var albumLeft = (album.image.axis.location.x + AlbumWall.Axis.origin.x) / AlbumWall.Axis.width_scale;
            var albumContainer = $("<div class='albumContainer' style='border:1px dashed #fff;box-sizing: border-box;position:absolute;background:#ccc;"+
                "width:"+albumWidth+"px;"+
                "height:"+albumHeight+"px;"+
                "top:"+albumTop+"px;"+
                "left:"+albumLeft+"px'></div>");
            AlbumWall.Wall.target.append(albumContainer);
            debugger;
        }

/*
        common function
        */
        function getAxisImageBorder(image) {//根据axisLocation获取其border
            var border = {
                top: {
                    y: image.axis.location.y,
                    limit: [image.axis.location.x,toFixed(image.axis.location.x + image.axis_width)],
                },
                right: {
                    x: toFixed(image.axis.location.x + image.axis_width),
                    limit: [toFixed(image.axis.location.y - image.axis_height), image.axis.location.y],
                },
                bottom: {
                    y: toFixed(image.axis.location.y - image.axis_height),
                    limit: [image.axis.location.x, toFixed(image.axis.location.x + image.axis_width)],
                },
                left: {
                    x: image.axis.location.x,
                    limit: [toFixed(image.axis.location.y - image.axis_height), image.axis.location.y],
                }
            };
            
            return border;
        }
        
        //put the axis border to baseline && get the last baseline
        //var baseline = addBaseLine(album.image.axis.border);
        function addBaseLine(baseline) {
            var lastBaseLine = new Array();
            if (AlbumWall.Axis.Baseline.length == 0) {
                lastBaseLine = baseline.slice();
            } else {
                //判断baseline cover情况
                lastBaseLine = baseline.slice();
                //获取重合段baseline
                var overlarp = overlarpline(lastBaseLine);
                //获取移除重合后的baseline
                var axisBaseline = removeOverlapLine(overlarp, _this.Axis.Baseline);
                var albumBaseline = removeOverlapLine(overlarp, lastBaseLine);
                //整合新的Axis.Baseline,并且获取crossPoint
                lastBaseLine = mergeBaseline(axisBaseline, albumBaseline);

            }
            AlbumWall.Axis.Baseline = lastBaseLine;

        }
        
        //获取coverline 重合baseline
        function overlarpline(baseline) {
            var overlarp = new Array();
            for (var i = 0; i < baseline.length; i++) {
                for (var j = 0; j < AlbumWall.Axis.Baseline.length; j++) {
                    var b1 = baseline[i];
                    var b2 = AlbumWall.Axis.Baseline[j];
                    if (b1.x == b2.x && b1.y == b2.y) { //处于同一直线上
                        var minF = Math.min(b1.f, b2.f);
                        var maxT = Math.max(b1.t, b2.t);
                        var totalLength = b1.t - b1.f + b2.t - b2.f;
                        if ((maxT - minF) < totalLength) {
                            //获取重合段,
                            //重合段数据
                            var larp = {
                                x: b1.x,
                                y: b1.y,
                                f: Math.max(b1.f, b2.f),
                                t: Math.min(b1.t, b2.t),
                            };
                            overlarp.push(larp);
                        }
                    }
                }
            }
            return overlarp;
        }
        //移除重合段baseline，拆分原baseline
        function removeOverlapLine(overlarp, baseline) {
            var newBaseline = new Array();
            if (!overlarp || overlarp.length == 0) {
                console.log("overlarp error");
                return null;
            } else {
                for (var i = 0; i < baseline.length; i++) {
                    var b = clone(baseline[i]);
                    var cover = false;
                    for (var j = 0; j < overlarp.length; j++) {
                        var l = clone(overlarp[j]);
                        if ((b.x == l.x && b.y == l.y) && ((l.f >= b.f && l.f < b.t) || (l.t <= b.t && l.t > b.f))) {
                            cover = true;
                            var t = clone(baseline.slice()[i]);
                            //删除或者拆分被重合的baseline
                            if (l.f > b.f) {
                                //前段间隔. l.f的开始位置为b.t的结束位置
                                t.t = l.f;
                                if (b.y) {//y值不为null,x轴平行方向line
                                    if (b.space == "y") { //space == "y" 方向为y轴正方向，为topborder
                                        //topborder，修改b.to.x值
                                        t.to.x = l.f;
                                    } else { //y轴负方向，为bottomborder
                                        //bottomborder,修改b.from.x值
                                        t.from.x = l.f;
                                    }
                                } else { //x值不为bull,y轴平行方向line
                                    if (b.space == "x") { //space == "x" x轴正方向, 为rightborder
                                        //rightborder,修改b.from.y
                                        t.from.y = l.f;
                                    } else {
                                        //leftborder
                                        t.to.y = l.f;
                                    }
                                }
                                newBaseline.push(t);
                            }
                            t = clone(baseline.slice()[i]);
                            if (l.t < b.t) {
                                //后段间隔,l.t的结束位置为b.f的开始位置
                                t.f = l.t;
                                if (t.y) {
                                    if (b.space == "y") {
                                        t.from.x = l.t;
                                    } else {
                                        t.to.x = l.t;
                                    }
                                } else {
                                    if (b.space == "x") {
                                        t.to.y = l.t;
                                    } else {
                                        t.from.y = l.t;
                                    }
                                }
                                newBaseline.push(t);
                            } else {
                                //前段重合或者后段重合或者完全重合，移除
                                //debugger;
                            }
                        } else {
                            if (j == (overlarp.length - 1)&&!cover) {
                                newBaseline.push(baseline[i]);
                            }
                        }
                    }
                }
                return newBaseline;
            }
        }
        
        //整合新的Axis.Baseline
        function mergeBaseline(b1, b2) {
            //拆分b1和b2，头尾相接
            var baseline = new Array();
            //startline
            if(b1.length==0||b2.length==0){
                console.log("mergeBaseline param error: b1,b2 null");
                return null;
            }
            b1.pushArray(b2);
            var b = b1;
            baseline.push(b.getIndex(0));//定义链头
            //connect baseline
            baseline = connectBaseline(baseline, b);
            baseline = mergeExtraBaseline(baseline);
            return baseline;
        }

        //getCrossPoint && Sac 
        function getCrossPoint(baseline) {
            if(!validateBaseline(baseline)){
                return null;                                    
            }
            var crossPointArray = new Array();
            for (var i = 0; i < baseline.length; i++) {
                var b1 = baseline[i];
                var b2;
                if (i == (baseline.length - 1)) {
                    b2 = baseline[0];
                } else {
                    b2 = baseline[i + 1];
                }
                //判断两条baseline所形成的直角，凹直角或是凸直角
                var crossPoint = baselineRightAngle(b1, b2);
                if (crossPoint) {
                    crossPointArray.push(crossPoint);
                }
            }
            return crossPointArray;
        }

        //判断两条baseline所形成的是凸直角还是凹直角，凹直角的交点即为crossPoint
        function baselineRightAngle(b1, b2) {
            if (b1.space == "x" && b2.space == "y") {
                //凹 第一象限
                var crosspoint = {
                    space_x: b1.space,
                    space_x_length:b2.length,
                    space_y: b2.space,
                    space_y_length:b1.length,
                    point: b1.to,
                };
                return crosspoint;
            } else if (b1.space == "-y" && b2.space == "x") {
                //凹 第二象限
                var crosspoint = {
                    space_x: b2.space,
                    space_x_length:b1.length,
                    space_y: b1.space,
                    space_y_length:b2.length,
                    point: b1.to,
                };
                return crosspoint;
            } else if (b1.space == "-x" && b2.space == "-y") {
                //凹 第三象限
                var crosspoint = {
                    space_x: b1.space,
                    space_x_length:b2.length,
                    space_y: b2.space,
                    space_y_length:b1.length,
                    point: b1.to,
                };
                return crosspoint;
            } else if (b1.space == "y" && b2.space == "-x") {
                //凹 第四象限
                var crosspoint = {
                    space_x: b2.space,
                    space_x_length: b1.length,
                    space_y: b1.space,
                    space_y_length: b2.length,
                    point: b1.to,
                };
                return crosspoint;
            }
            return null;
        }

        function getOutCrossPoint(baseline) {
            if (!validateBaseline(baseline)) {
                return null;
            }
            var outCrossPointArray = new Array();
            for (var i = 0; i < baseline.length; i++) {
                var b1 = baseline[i];
                var b2;
                if (i == (baseline.length - 1)) {
                    b2 = baseline[0];
                } else {
                    b2 = baseline[i + 1];
                }
                //判断两条baseline所形成的直角，凹直角或是凸直角
                var outCrossPoint = outBaselineAngel(b1, b2);
                if (outCrossPoint) {
                    outCrossPointArray.push(outCrossPoint);
                }
            }
            return outCrossPointArray;
        }

        function outBaselineAngel(b1,b2) {
            if (b1.space == "y" && b2.space == "x") {
                var outpoint = {
                    point: b1.to,
                    space_x: b2.space,
                    space_y: b1.space,
                };
                return outpoint;
            } else if (b1.space == "x" && b2.space == "-y") {
                //凸 第二象限
                var outpoint = {
                    point: b1.to,
                    space_x: b1.space,
                    space_y: b2.space,
                };
                return outpoint;
            } else if (b1.space == "-y" && b2.space == "-x") {
                //凸 第三象限
                var outpoint = {
                    point: b1.to,
                    space_x: b2.space,
                    space_y: b1.space,
                };
                return outpoint;
            } else if (b1.space == "-x" && b2.space == "y") {
                //凸 第四象限
                var outpoint = {
                    point: b1.to,
                    space_x: b1.space,
                    space_y: b2.space,
                };
                return outpoint;
            }
        }

        function getOutBaseline(out) {
            var baselineArray = new Array();
            for (var i = 0; i < out.length; i++) {
                var l1 = out[i];
                var l2;
                if (i == (out.length - 1)) {
                    l2 = out[0];
                } else {
                    l2 = out[i + 1];
                }
                if ((l1.point.x == l2.point.x) || (l2.point.y == l2.point.y)) {
                    if (l1.space_x == l2.space_x) {
                        if (l1.space_y == l2.space_y || (l1.space_x == "x" && l1.space_y == "-y") || (l1.space_x == "-x" && l1.space_y == "y")) {
                            continue;
                        }
                        var baseline = {
                            space: l1.space_x,//y正方向空
                            x: l1.point.x,
                            y: null,
                            f: Math.min(l1.point.y,l2.point.y),//limit from
                            t: Math.max(l1.point.y,l2.point.y),//limit to
                            from: l1.point, //从左至右
                            to: l2.point,
                            length: Math.abs(Math.max(l1.point.y, l2.point.y) - Math.min(l1.point.y, l2.point.y)),
                        };
                        baselineArray.push(baseline);
                    } else if (l1.space_y == l2.space_y) {
                        if (l1.space_x == l2.space_x || (l1.space_y == "y" && l1.space_x == "x") || (l1.space_y == "-y" && l1.space_x == "-x")) {
                            continue;
                        }
                        var baseline = {
                            space: l1.space_y,//y正方向空
                            x: null,
                            y: l1.point.y,
                            f: Math.min(l1.point.x, l2.point.x),//limit from
                            t: Math.max(l1.point.x, l2.point.x),//limit to
                            from: l1.point, //从左至右
                            to: l2.point,
                            length: Math.abs(Math.max(l1.point.y, l2.point.y) - Math.min(l1.point.y, l2.point.y)),
                        };
                        baselineArray.push(baseline);
                    }
                }
            }
            return baselineArray;
        }

        //根据crosspoint判断是否有凹区间，获取这个区间的数据 -- cancel
        //-- update 修改方法为判断crossPoint点的space方向的limit值
        function getSac(crosspoint) {
            for (var i = 0; i < crosspoint; i++) {
                var c1 = crosspoint[i];
                var c2;
                var cIndex = i + 1;
                if (i < (crosspoint.length - 1)) {
                    c2 = crosspoint[i + 1];
                } else {
                    c2 = crosspoint[0];
                    cIndex = 0;
                }

                if (c1.point.x == c2.point.x) {//处于同一平行于y轴的直线上
                    if (c1.space_x == c2.space_x) {//x轴空白方向一致
                        if (c1.space_y != c2.space_y) {//y轴空白方向相反。形成凹区间
                            //update c1
                            crosspoint[i].limit_y = toFixed(Math.abs((Math.max(c1.point.y,c2.point.y)-Math.min(c1.point.y,c2.point.y))));
                            //update c2;
                            crosspoint[cIndex].limit_y =toFixed(Math.abs((Math.max(c1.point.y,c2.point.y)-Math.min(c1.point.y,c2.point.y))));
                        }
                    }
                }else if(c1.point.y == c2.point.y){
                    if(c1.space_y == c2.space_y){
                        if (c1.space_x != c2.space_x) {
                            crosspoint[i].limit_x = toFixed(Math.abs((Math.max(c1.point.x,c2.point.x)-Math.min(c1.point.x,c2,point.x))));
                            crosspoint[cIndex].limit_x = toFixed(Math.abs((Math.max(c1.point.x,c2.point.x)-Math.min(c1.point.x,c2,point.x))));
                        }
                    }
                }
            }
            return crosspoint;
        }

        //转换border to baseline 数据
        function borderToBaseline(border) {
            var baselinelist = new Array();
            var topBorder = {
                space: "y",//y正方向空
                x: null,
                y: border.top.y,
                f: border.top.limit[0],//limit from
                t: border.top.limit[1],//limit to
                from: { x: border.top.limit[0], y: border.top.y }, //从左至右
                to: { x: border.top.limit[1], y: border.top.y },
                length: Math.abs(border.top.limit[1] - border.top.limit[0]),
            };
            baselinelist.push(topBorder);
            var rightBorder = {
                space: "x",//x正方向空
                x: border.right.x,
                y: null,
                f: border.right.limit[0],//limit from
                t: border.right.limit[1],//limit to
                from: { x: border.right.x, y: border.right.limit[1] },//从上到下
                to: { x: border.right.x, y: border.right.limit[0] },
                length: Math.abs(border.right.limit[1] - border.right.limit[0]),
            };
            baselinelist.push(rightBorder);
            var bottomBorder = {
                space: "-y",//y负方向空
                x: null,
                y: border.bottom.y,
                f: border.bottom.limit[0],//limit from
                t: border.bottom.limit[1],//limit to
                from: { x: border.bottom.limit[1], y: border.bottom.y }, //从左至右
                to: { x: border.bottom.limit[0], y: border.bottom.y },
                length: Math.abs(border.bottom.limit[1] - border.bottom.limit[0]),
            };
            baselinelist.push(bottomBorder);
            var leftBorder = {
                space: "-x",//x负方向空
                x: border.left.x,
                y: null,
                f: border.left.limit[0],//limit from
                t: border.left.limit[1],//limit to
                from: { x: border.left.x, y: border.left.limit[0] },//从下到上
                to: { x: border.left.x, y: border.left.limit[1] },
                length: Math.abs(border.left.limit[1] - border.left.limit[0]),
            };
            baselinelist.push(leftBorder);
            return baselinelist;
        }

        //验证baseline是否正确，完全闭合区间
        function validateBaseline(baseline) {
            if ((baseline.length < 4) || (baseline.length % 2 != 0)) {
                return false;
            }
            baseline.each(function (b, i) {
                var start = this[0];
                var prev = null;
                if (i == 0) {
                    start = b;
                    prev = this[this.length - 1];
                    if (prev.to.x != start.from.x || prev.to.y != start.from.y) {
                        console.log("baseline data error, not close area");
                        return false;
                    }
                } else {
                    prev = this[i - 1];
                    if (prev.to.x != b.from.x || prev.to.y != b.from.y) {
                        console.log("baseline data error, not close area");
                        return false;
                    }
                }
            });
            return true;
        }
        
        //选取baseline的最后一个baseline的to值 == baseline.from的值，然后push到baseline中
        function connectBaseline(container, baseline) {
            var last = container[container.length - 1];
            var match = null;
            if (baseline.length > 1) {
                for (var i = 0; i < baseline.length; i++) {
                    var b = baseline[i];
                    if (last.to.x == b.from.x && last.to.y == b.from.y) {
                        if (!match) {
                            match = baseline.getIndex(i);
                        } else {
                            throw Exception;
                        }
                    }
                }
                if (match) {
                    container.push(match);
                } 

            } else if (baseline.length == 1) {
                var first = container[0];
                var b = baseline[0];
                if (b.to.x == first.from.x && b.to.y == first.from.y) {
                    container.push(baseline.getIndex(0));
                    console.log("connectBaseline:complete");
                    return container;
                } 
            }
            if (baseline.length > 0) {
                return connectBaseline(container, baseline);
            }
        }
        
        /*leftBorder = {
            space: "-x",//x负方向空
            x: border.left.x,
            y: null,
            f: border.left.limit[0],//limit from
            t: border.left.limit[1],//limit to
            from: { x: border.left.x, y: border.left.limit[0] },//从下到上
            to: { x: border.left.x, y: border.left.limit[1] },
            length: Math.abs(border.left.limit[1] - border.left.limit[0]),
        };*/

        //移除链接后为同一直线的baseline
        function mergeExtraBaseline(baseline) {
            var newLine = new Array();
            for (var i = 0; i < baseline.length; i++) {
                var b1 = baseline[i];
                var bIndex = 0;
                
                if (i < baseline.length - 1) {
                    bIndex = i + 1;
                }
                var b2 = baseline[bIndex];
                if (b1.space == b2.space && b1.x == b2.x && b1.y == b2.y) {
                    b2 = baseline.getIndex(bIndex);
                    b1.f = Math.min(b1.f, b2.f);
                    b1.t = Math.max(b1.t, b2.t);
                    b1.to = b2.to;
                    b1.length += b2.length;
                }
                newLine.push(b1);
            }
            return newLine;
        }
        

    },
};

    //获取数组中的index元素对象并且从原数组中移除
Array.prototype.getIndex = function (index) {
    return this.splice(index, 1)[0];
};
//将一个数组push进另一个数组
Array.prototype.pushArray = function (array) {
    if (isArray(array)) {
        array.each(function (a, i, target) {
            target.push(a);
        }, this);
    } else {
        console.log("pushArray param error");
    }
};

function toFixed(number, n) {
    !n && (n = 4);
    var a = new Number(number);
    return parseFloat(a.toFixed(n));
}
