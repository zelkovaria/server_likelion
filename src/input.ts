import readline from "readline/promises";

export const input = async (question?: string) => { 
  //input은 question이라는걸 받는 경우에 string 형태로 넘김
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(question ?? "" );
  //question이 넘어왔으면 보여주고 아니면 빈문자를 보여주기 위함
  rl.close();
  return answer;
};