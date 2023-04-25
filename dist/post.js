"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.changeUserId = void 0;
const input_1 = require("./input");
let loggedInUserId = null;
const changeUserId = (id) => {
    loggedInUserId = id;
};
exports.changeUserId = changeUserId;
let posts = [];
const createPosts = (postsInfo) => {
    posts.push({
        id: posts.length + 1,
        ...postsInfo,
    });
};
const getAllPosts = () => {
    return posts;
};
const deletePosts = (id) => {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
        return;
    }
    console.log(posts[postIndex].writerId);
    console.log(loggedInUserId);
    if (posts[postIndex].writerId === loggedInUserId) {
        posts.splice(postIndex, 1);
    }
    else {
        console.log("님 게시물이 아닌데요");
    }
};
const main = async () => {
    console.log("Welcome to student management system!");
    console.log(`
    1. 피드 보기
    2. 게시물 작성
    3. 게시물 삭제
    0. 로그아웃
    `);
    let option = "";
    do {
        option = await (0, input_1.input)("Select an option: ");
        switch (option) {
            case "1":
                console.log("피드 보기");
                console.log(getAllPosts());
                break;
            case "2":
                console.log("게시물 작성");
                const text = await (0, input_1.input)("내용: ");
                createPosts({ writerId: 1, content: text, createdAt: new Date() });
                console.log("게시물 작성 완완");
                break;
            case "3":
                console.log("게시물 삭제");
                const idForDelete = parseInt(await (0, input_1.input)("삭제할 게시물의 id: "));
                deletePosts(idForDelete);
                break;
            case "0":
                console.log("로그아웃");
                break;
            default:
                console.log("Invalid option");
                break;
        }
    } while (option !== "0");
};
exports.main = main;
