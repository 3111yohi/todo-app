import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//指定のリストから指定の要素を削除
const deleteFromIncompleteList = (target, removeFrom) => {
  //押された削除ボタンの親タグ(div)を未完了リストから削除
  document.getElementById(removeFrom).removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  //button(完了)作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //削除関数呼び出し
    deleteFromIncompleteList(completeButton.parentNode, "incomplete-list");

    //完了リストに追加する要素を作る
    const addTarget = completeButton.parentNode;
    //TODO内容のテキスト取得
    const text = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;

    //liタグ追加
    const li = document.createElement("li");
    li.innerText = text;

    //戻すボタン追加
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //完了したTODOから削除する、削除関数呼び出し
      deleteFromIncompleteList(backButton.parentNode, "complete-list");

      //テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });
    //addTargetにliタグと戻すボタンを子要素として追加
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    //完了リストにaddTargetを追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //button(削除)作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //削除関数呼び出し
    deleteFromIncompleteList(deleteButton.parentNode, "incomplete-list");
  });

  //divタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストにdivを追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
