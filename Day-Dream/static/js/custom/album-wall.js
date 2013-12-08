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
        //原点
        origin: {
            x: 0,
            y: 0,
        },
        Baseline: new Array(),
        CrossPoint: new Array(),
        Sac: new Array(),//死巷，凹区间块
        Content: new Array(),
        AutoContent:new Array(),//无填充死巷的自动填充块
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
        
        function caculateAlbumArrange(albumList) {
            (!album || !isArray(albumList) || album.length == 0) && (function () {
                debugger;
                return null;
            });
            var album = albumList.splice(0, 1)[0];
            //[1]:无baseline的情况
            if (AlbumWall.Axis.baseline.length == 0) {
                //取坐标系-x方向为album上下对称点且右边对齐y轴
                album.image.axis = {};
                album.image.axis.location = {
                    x: -album.image.axis_width,
                    y: album.image.axis_height / 2,
                };

                album.image.axis.border = getAxisImageBorder(album.image);

                //test
                var baseline = borderToBaseline(album.image.axis.border);
                if (validateBaseline(baseline)) {
                    addBaseLine(baseline);
                    //完成本次排列
                    //完成本次排列
                    afterArrange(album, albumList)
                }

                //无CrossPoint，有baseline的情况
            } else if (AlbumWall.Axis.CrossPoint.length == 0) {
                //根据_this.Axis.Baseline
                if (validateBaseline(AlbumWall.Axis.Baseline)) {
                    /*var topBorder = {
                        space: "y",//y正方向空
                        x: null,
                        y: border.top.y,
                        f: border.top.limit[0],//limit from
                        t: border.top.limit[1],//limit to
                        from: { x: border.top.limit[0], y: border.top.y }, //从左至右
                        to: { x: border.top.limit[1], y: border.top.y },
                    };*/

                    //get the baseline center point and the distance to the origin point
                    var baselineCenter = AlbumWall.Axis.Baseline.each(function (b, i) {
                        var x = (b.from.x + b.to.x) / 2;
                        var y = (b.from.y + b.to.y) / 2;
                        b.center = {
                            x: x,
                            y: y,
                            distance: Math.pow(x, 2) + Math.pow(y, 2)
                        };
                        return { target: b, index: i };
                    });

                    baselineCenter.sort(function (a, b) {
                        //a在前，返回负数
                        //b在前,返回正数
                        //0，不变
                        if (a.target.center.distance < b.target.center.distance) {
                            return -1;
                        } else if (a.target.center.distance == b.target.center.distance) {
                            if (a.target.space == "-x" || b.target.space == "-y") {
                                return -1;
                            } else if (b.target.space == "-x" || a.target.space == "-y") {
                                return 1;
                            } else {
                                return 0;
                            }
                        } else {
                            return 1;
                        }
                    });

                    var targetBaseline = baselineCenter[0];
                    album.image.axis = {};
                    switch (targetBaseline.space) {
                        case "y":
                            album.image.axis.location = {
                                x: targetBaseline.center.x - (album.image.axis_width / 2),
                                y: targetBaseline.center.y + (album.image.axis_height),
                            };
                            break;
                        case "-y":
                            album.image.axis.location = {
                                x: targetBaseline.center.x - (album.image.axis_width / 2),
                                y: targetBaseline.center.y,
                            };
                            break;
                        case "x":
                            album.image.axis.location = {
                                x: targetBaseline.center.x,
                                y: targetBaseline.center.y + (album.image.axis_height / 2),
                            };
                            break;
                        case "-x":
                            album.image.axis.location = {
                                x: targetBaseline.center.x - (album.image.axis_width),
                                y: targetBaseline.center.y + (album.image.axis_height / 2),
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
                        afterArrange(album,albumList)
                    }

                } else if (AlbumWall.Axis.CrossPoint.length > 0) {//有crossPoint的情况
                    console.log("TODO: CorssPoint.length=" + AlbumWall.Axis.CrossPoint.length);
                }

                function afterArrange(album, albumList) {
                    //添加到最终内容Content
                    AlbumWall.Axis.Content.push(album);
                    if (albumList.length > 0) {
                        caculateAlbumArrange(albumList);
                    }
                }

            }
        }
           

        /*
        common function
        */
        function getAxisImageBorder(image) {//根据axisLocation获取其border
            var border = {
                top: {
                    y: image.axis.location.y,
                    limit: [image.axis.location.x, image.axis.location.x + image.axis_width],
                },
                right: {
                    x: image.axis.location.x + image.axis_width,
                    limit: [image.axis.location.y - image.axis_height, image.axis.location.y],
                },
                bottom: {
                    y: image.axis.location.y - image.axis_height,
                    limit: [image.axis.location.x, image.axis.location.x + image.axis_width],
                },
                left: {
                    x: image.axis.location.x,
                    limit: [image.axis.location.y - image.axis_height, image.axis.location.y],
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
                var overlarpline = overlarpline(lastBaseLine);
                //获取移除重合后的baseline
                var axisBaseline = removeOverlapLine(overlarpline, _this.Axis.Baseline);
                var albumBaseline = removeOverlapLine(overlarpline, lastBaseLine);
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
                        var maxT = Math.max(b1.t, b2, t);
                        var totalLength = b1.t - b1.f + b2.t - b2.f;
                        if ((maxT - minF) < totalLength) {
                            debugger;
                            //获取重合段,
                            //重合段数据
                            var larp = {
                                x: b1.x,
                                y: b1.y,
                                f: Math.max(b1f, b2f),
                                t: Math.min(b1.t, b2.t),
                            }
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
                debugger;
                return null;
            } else {
                for (var i = 0; i < baseline.length;i++){
                    for (var j = 0; j < overlarp.length; j++) {
                        var b = baseline[i];
                        var l = overlarp[j];
                        if (b.x == l.x && b.y == l.y && l.f >= b.f && l.t <= b.t ) {
                            //删除或者拆分被重合的baseline
                            if (l.f > b.f) {
                                //前段间隔. l.f的开始位置为b.t的结束位置
                                b.f = b.f;
                                b.t = l.f;
                                if (b.y) {//y值不为null,x轴平行方向line
                                    if (b.space == "y") { //space == "y" 方向为y轴正方向，为topborder
                                        //topborder，修改b.to.x值
                                        b.to.x = b.t;
                                    } else { //y轴负方向，为bottomborder
                                        //bottomborder,修改b.from.x值
                                        b.from.x = b.t;
                                    }
                                } else { //x值不为bull,y轴平行方向line
                                    if (b.space == "x") { //space == "x" x轴正方向, 为rightborder
                                        //rightborder,修改b.from.y
                                        b.from.y = b.t;
                                    } else {
                                        //leftborder
                                        b.to.y = b.t;
                                    }
                                }
                                newBaseline.push(b);
                                debugger;
                            } else if (l.t < b.t) {
                                //后段间隔,l.t的结束位置为b.f的开始位置
                                b.f = l.t;
                                b.t = b.t;
                                if (b.y) {
                                    if (b.space == "y") {
                                        b.from.x = b.f;
                                    } else {
                                        b.to.x = b.f;
                                    }
                                } else {
                                    if (b.space == "x") {
                                        b.to.y = b.f;
                                    } else {
                                        b.from.y = b.f;
                                    }
                                }
                                newBaseline.push(b);
                                debugger;
                            } else {
                                //前段重合或者后段重合或者完全重合，移除
                            }

                        } else {
                            if (j == (overlarp.length - 1)) {
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
            var b = b1.pushArray(b2);
            baseline.push(b.getIndex(0));//定义链头
            //connect baseline
            return baseline = connectBaseline(baseline, b);
        }

        //getCrossPoint && Sac
        function getCrossPoint(baseline) {
            if(!validateBaseline(baseline)){
                return null;                                    
            }
            for (var i = 0; i < baseline.length; i++) {
                var b1 = baseline[i];
                var b2;
                if (i == (baseline.length - 1)) {
                    b2 = baseline[0];
                } else {
                    b2 = baseline[i + 1];
                }
                //判断两条baseline所形成的直角，凹直角或是凸直角
                return baselineRightAngle(b1, b2);
            }
        }

        //判断两条baseline所形成的是凸直角还是凹直角，凹直角的交点即为crossPoint
        function baselineRightAngle(b1, b2) {
            var crossPointArray = new Array();
            if (b1.space == "y" && b2.space == "x") {
                //凸 第一象限
            } else if (b1.space == "x" && b2.space == "-y") {
                //凸 第二象限
            } else if (b1.space == "-y" && b2.space == "-x") {
                //凸 第三象限
            } else if (b1.space == "-x" && b2.space == "y") {
                //凸 第四象限
            } else if (b1.space == "x" && b2.space == "y") {
                //凹 第一象限
                var crosspoint = {
                    space_x: "x",
                    space_y: "y",
                    point: b1.to,
                }
                crossPointArray.push(crosspoint);
            } else if (b1.space == "-y" && b2.space == "x") {
                //凹 第二象限
                var crosspoint = {
                    space_x: "x",
                    space_y: "-y",
                    point: b1.to,
                }
                crossPointArray.push(crosspoint);
            } else if (b1.space == "-x" && b2.space == "-y") {
                //凹 第三象限
                var crosspoint = {
                    space_x: "-x",
                    space_y: "-y",
                    point: b1.to,
                }
                crossPointArray.push(crosspoint);
            } else if (b1.space == "y" && b2.space == "-x") {
                //凹 第四象限
                var crosspoint = {
                    space_x: "-x",
                    space_y: "y",
                    point: b1.to,
                }
                crossPointArray.push(crosspoint);
            }
            return crossPointArray;
        }

        //根据crosspoint判断是否有凹区间，获取这个区间的数据
        function getSac(crosspoint) {
            var sacArray= new Array();
            for (var i = 0; i < crosspoint; i++) {
                var c1 = crosspoint[i];
                var c2;
                if (i < (crosspoint.length - 1)) {
                    c2 = crosspoint[i + 1];
                } else {
                    c2 = crosspoint[0];
                }

                if (c1.point.x == c2.point.x) {//处于同一平行于y轴的直线上
                    if (c1.space_x == c2.space_x) {//x轴空白方向一致
                        if (c1.space_y != c2.space_y) {//y轴空白方向相反。形成凹区间
                            var sacBaseline = {
                                space: c1.space_x,
                                from: c1.point,
                                to: c2.point,
                                length:Math.abs((Math.max(c1.point.y,c2.point.y)-Math.min(c1.point.y,c2.point.y))),
                            }
                            sacArray.push(sacBaseline);
                        }
                    }else if(c1.space_y == c2.space){
                        if (c1.space_x != c2.space_x) {
                            var sacBaseline = {
                                space: c1.space_y,
                                from: c1.point,
                                to: c2.point,
                                length:Math.abs((Math.max(c1.point.x,c2.point.x)-Math.min(c1.point.x,c2,point.x))),
                            }
                            sacArray.push(sacBaseline);
                        }
                    }
                }
            }
            return sacArray;
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
                        console.log("baseline data error, not close rear");
                        debugger;
                        return false;
                    }
                } else {
                    prev = this[i - 1];
                    if (prev.to.x != b.from.x || prev.to.y != b.from.y) {
                        console.log("baseline data error, not close rear");
                        debugger;
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
                            debugger;
                        }
                    }
                }
                if (match) {
                    container.push(match)
                } else {
                    debugger;
                }

            } else if (baseline.length == 1) {
                var first = container[0];
                var b = baseline[0];
                if (b.to.x == first.from.x && b.to.y == first.from.y) {
                    container.push(baseline.getIndex(0));
                    console.log("connectBaseline:complete");
                    return container;
                } else {
                    debugger
                }
            }
            if (baseline.length > 0) {
                return connectBaeline(container, baseline);
            }
        }

    },
};

AlbumWall.Init();

//获取数组中的index元素对象并且从原数组中移除
Array.prototype.getIndex = function (index) {
    return this.splice(index, index + 1)[0];
}
//将一个数组push进另一个数组
Array.prototype.pushArray = function (array) {
    if (isArray(array)) {
        array.each(function (a, i,target) {
            target.push(a);
        },this);
    } else {
        console.log("pushArray param error");
    }
}