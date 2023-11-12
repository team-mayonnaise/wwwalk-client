export default function CommentModal({ ifModalOn, setIfModalOn, curComments }) {
  return (
    <div className="container">
      <div className="modal">
        <div className="titleBox">댓글</div>

        {curComments.map((comment) => (
          <div className="commentBox">
            <img src="/icons/profile.svg" className="profileImage" />
            <div style={{ width: 12 }} />
            <div className="contentBox">
              <div className="nameBox">
                <b>{comment.userNickName}</b>
                <div style={{ width: 7 }} />
                {Math.floor((new Date() - comment.commentDate) / 60000)}분전
              </div>
              <div className="comment">{comment.comment}</div>
              <div className="addComment">답글 달기</div>
            </div>
          </div>
        ))}

        {/* <div className="commentBox">
          <img src="/icons/profile.svg" className="profileImage" />
          <div style={{ width: 12 }} />
          <div className="contentBox">
            <div className="nameBox">
              <b>김지원</b>
              <div style={{ width: 7 }} />
              24분
            </div>
            <div className="comment">댓글 내용이 들어갑니다.</div>
            <div className="addComment">답글 달기</div>
          </div>
        </div> */}
      </div>
      <div className="bottomBox">
        <div className="addCommentBox">
          <img
            src="https://m.the-pet.co.kr/web/product/medium/202305/26b513d3ca08f2104c0eb8c2da4c667f.jpg"
            className="profileImage"
          />
          <div style={{ width: 12 }} />
          <div className="inputBox">댓글을 입력하세요.</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          z-index: 5;

          display: ${ifModalOn ? "block" : "none"};
        }

        .modal {
          width: 100%;
          height: 467px;

          border-radius: 8px 8px 0 0;

          background-color: white;

          position: fixed;
          bottom: 0;

          padding: 0 30px 0 30px;
        }

        .modal .titleBox {
          width: 330px;
          margin-top: 33px;
          margin-bottom: 5px;

          color: #000;
          font-size: 16px;
          font-weight: 600;
        }

        .modal .commentBox {
          margin-top: 19px;

          display: flex;
        }

        .modal .commentBox .profileImage {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }

        .modal .commentBox .contentBox {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          width: 324px;
          height: 53px;
        }

        .modal .commentBox .contentBox .nameBox {
          font-size: 8px;
          font-weight: 600;
          color: #777777;

          display: flex;
          align-items: end;
        }
        .modal .commentBox .contentBox .nameBox b {
          font-size: 12px;
          font-weight: 600;
          color: #000;
        }

        .modal .commentBox .contentBox .comment {
          font-size: 12px;
          color: #000;
          font-weight: 500;
        }

        .modal .commentBox .contentBox .addComment {
          font-size: 8px;
          font-weight: 600;
          color: #777777;
        }

        .bottomBox {
          position: fixed;
          bottom: 0;

          width: 100%;
          height: 83px;

          box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);

          display: flex;
          justify-content: center;
          align-items: first;
        }

        .bottomBox .addCommentBox {
          width: 344px;
          height: 39px;

          display: flex;
          justify-content: start;

          margin-top: 12px;
        }

        .bottomBox .addCommentBox .profileImage {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }

        .bottomBox .addCommentBox .inputBox {
          width: 283px;
          height: 38px;

          background-color: #f5f5f5;

          display: flex;
          align-items: center;

          color: rgba(0, 0, 0, 0.5);
          font-size: 10px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}
