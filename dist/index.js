"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const post_1 = require("./post");
const post_2 = require("./post");
let students = [];
const createStudent = (studentInfo) => {
    students.push({
        id: students.length + 1,
        ...studentInfo,
    });
};
const checkUser = (email, pwd) => {
    const user = students.find((student) => student.email === email && student.pwd === pwd);
    if (user) {
        return user;
    }
    else {
        return null;
    }
};
const main = async () => {
    console.log("CLI 버전 인스타그램에 오신 여러분을 환영합니다");
    console.log("로그인을 안 하면 아무것도 못함");
    let option = "";
    do {
        console.log(`
        1. 로그인
        2. 회원가입
        0. 그냥 나가기
        `);
        option = await (0, input_1.input)("뭐하실?: ");
        switch (option) {
            case "1":
                const email = await (0, input_1.input)("이메일: ");
                const pwd = await (0, input_1.input)("비밀번호: ");
                const isRegistered = checkUser(email, pwd);
                if (isRegistered) {
                    console.log(`${isRegistered.name}님 하이`);
                    (0, post_2.changeUserId)(isRegistered.id);
                    await (0, post_1.main)();
                }
                break;
            case "2":
                const newName = await (0, input_1.input)("이름: ");
                const newEmail = await (0, input_1.input)("이메일: ");
                const newPwd = await (0, input_1.input)("비밀번호: ");
                createStudent({ name: newName, email: newEmail, pwd: newPwd });
                break;
            case "0":
                break;
        }
    } while (option !== "0");
};
main();
