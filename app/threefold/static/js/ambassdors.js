/*
 * Copyright 2017 ThreeFold Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @@license_version:1.3@@
 */
"use strict";
$(function () {
    var render = function (dataset) {
        var amp = $("<div></div>").addClass('rj-team');
        var details = dataset;
        var added = []
        if (details) {
            while (true) {
                if (added.length === details.length) {
                    break;
                }
                var index = Math.floor(Math.random() * details.length);
                if (added.includes(index)) {
                    continue;
                }
                added.push(index);
                var random_details = details[index];
                var parent = $("<div>").addClass("rj-team-member");
                var a = $("<div>").addClass('member-photo');
                var img = $("<img/>").addClass('rj-team-member-photo-rollover');
                img.prop('src', '/avatars/' + encodeURIComponent(random_details.avatar));
                a.append(img);
                parent.append(a);
                var div = $("<div>").addClass("rj-team-member-info-text").css('display', 'none');
                var imgCol = $("<div>").addClass('col-md-3 col-sm-4');
                var dataCol = $("<div>").addClass('col-md-9 col-sm-8');
                var close = $('<div>').addClass('close-bio').text('x');
                div.append(imgCol);
                imgCol.append($("<img/>").width('150px').prop("src", "/avatars/" + encodeURIComponent(random_details.avatar)));
                div.append(dataCol);
                dataCol.append($("<div>").addClass('member-name').text(random_details.name));
                dataCol.append($("<div>").addClass('bio-excerpt').text(random_details.nationality));
                dataCol.append($("<div>").addClass('bio-excerpt').text(random_details.why));
                dataCol.append($("<div>").addClass('bio-excerpt').text(random_details.bio));
                div.append(close);
                parent.append(div);
                amp.append(parent);
            }
        }
        for (var i = 0; i < 8; i++) {
            if (details.length == 0) {
                var parent = $("<div>").addClass("rj-team-member");
                var a = $("<div>");
                var img = $("<img/>").width('90px').prop('src', '/img/Jobs-CTA-inline.png');
                a.append(img);
                parent.append(a);
                amp.append(parent);
            }
        }
        return amp;
    };

    var renderOps = function (dataset) {
        var amp = $("<div></div>").addClass('rj-team');

        function sortWeight(a, b) {
            return a.weight - b.weight;
        }
        var details = dataset.sort(sortWeight);
        var added = [];

        if (details) {
            for (var i = 0; i < details.length; ++i) {
                if (added.length === details.length) {
                    break;
                }
                added.push(details);
                var parent = $("<div>").addClass("rj-team-member");
                var photoDiv = $("<div>").addClass('farmer-photo');
                var a = $('<a>').prop('href', details[i].link).prop('target', '_blank');
                var img = $("<img/>").addClass('rj-team-member-photo-rollover');
                if (details[i].weight > 0) {
                    img.prop('src', '../avatars/' + encodeURIComponent(details[i].avatar));
                    photoDiv.append(img);
                    a.append(photoDiv);
                    parent.append(a);
                    amp.append(parent);
                }
            }
        }
        return amp;
    };

    function toggleBio() {
        $(".rj-team-member .member-photo").click(function (event) {
            event.preventDefault();
            $(this).parent().siblings().children(".member-photo").removeClass("selected"), $(this).toggleClass("selected"), $(this).parent().siblings().children(".rj-team-member-info-text").hide(), $(this).siblings(".rj-team-member-info-text").toggle();
            var a = $(this).siblings(".rj-team-member-info-text").offset();
            $("body").animate({
                scrollTop: a
            }), $(".close-bio").click(function () {
                $(this).parent().siblings(".member-photo").removeClass("selected"), $(this).parent(".rj-team-member-info-text").hide()
            })
        })
    }

    function activateTeamFilter() {
        $("#teamFilterText").prop("disabled", !1), $("#teamFilterText").on("input", function () {
            var a = $("#teamFilterText").val();
            "" == a ? $(".rj-team-member").show() : ($(".rj-team-member").hide(), $(".rj-team-member:Contains('" + a + "')").show())
        })
    }

    // function unselectDiv() {
    //     $(document).click(function(event) {
    //         $(event.target).closest(".rj-team-member .member-photo").length || $(".rj-team-member .member-photo").is(":visible") && ($(".rj-team-member-info-text").hide(), $(".member-photo").removeClass("selected"))
    //         event.preventDefault();
    //     })
    // }
    $("#ambassadors").append(render(ambassadors));
    $("#hosters").append(render(hosters));
    // $("#operators").append(renderOps(operators));
});