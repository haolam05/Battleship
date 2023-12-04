export default function initializeElements() {
  const userBoardEl = document.querySelector('#user-board');
  const computerBoardEl = document.querySelector('#computer-board');
  const setupBtnEl = document.querySelector('#setup-btn');
  const resetBtnEl = document.querySelector('#reset-btn');
  const shipContainerEl = document.querySelector('#ships-container');
  const winMsgEl = document.querySelector('#userWinMsg');
  const loseMsgEl = document.querySelector('#userLoseMsg');

  return {
    userBoardEl,
    computerBoardEl,
    setupBtnEl,
    resetBtnEl,
    shipContainerEl,
    winMsgEl,
    loseMsgEl
  }
}
