import styled from "styled-components";
import { GalleryPost } from "../routes/gallery";
import { useEffect, useState } from "react";
import { create } from "domain";
import { deflate } from "zlib";

const Wrapper = styled.div`
    font-family: "Noto Sans KR";

    outline: solid 1px #DDE1E6;
    margin: 10px;
`;

const GalleryContainer = styled.a`
    width: 308px;
    height: 524px;

    text-decoration:none;

    &:hover{

    }
`;

const GalleryImg = styled.img`
    max-width: 308px;
    max-height: 220px;
    overflow: hidden;
`;

const GalleryTitleContainer = styled.div`

`;

const Id = styled.div`
    
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: #21272A;

    margin: 10px;
    padding-top: 20px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #21272A;

    margin: 10px;
`

const AuthorContainer = styled.div`
    display: flex;
    align-items: center;

    margin-top: 40px;
`;

const AuthorPic = styled.img`
    height: 48px;
    width: 48px;

    border-radius: 50%;
    margin: 10px;
`;

const AuthorName = styled.a`
    font-size: 16px;
    font-weight: 400;
    color: #21272A;

    margin: 10px;

    text-decoration:none;

    &:hover{
        text-decoration: underline;
    }
`;

const AuthorDesc = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #21272A;

    margin: 10px;
`

const CreatedAt = styled.div`
    text-decoration: none;
    color: grey;

    text-align: right;
    padding: 10px;
`;

export function TruncatedText(fullText: string, maxLen: number){
    if (fullText.length > maxLen) {
        return fullText.slice(0, maxLen) + "...";
      }
      return fullText;
}

export default function GalleryItem({bid, thumbNaile, boardTitle, userName, createdDate, boardContents, userId}:GalleryPost ){
    const [userPic, setUserPic] = useState("cool_profile_pic.webp")
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const date = new Date(createdDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        setFormattedDate(`${year}년 ${month}월 ${day}일 ${hours}:${minutes}`);
    }, [createdDate]); // createdDate가 변경될 때만 formattedDate를 업데이트

    return(
        <Wrapper>
            <GalleryContainer href={`gallery/detail/${bid}`}>
                { thumbNaile ? <GalleryImg src={thumbNaile} /> : <GalleryImg src="home_main.jpg" /> }

                <GalleryTitleContainer>
                    {/* <Id>{bid}</Id> */}
                    <Title>{boardTitle}</Title>
                    <Description>{TruncatedText(boardContents, 40)}</Description>
                    <AuthorContainer>
                        <AuthorPic src={userPic} />
                        <div>
                            <AuthorName href={`profile/${userId}`}>{userName}</AuthorName>
                            <AuthorDesc>37기 베이스</AuthorDesc>
                        </div>
                    </AuthorContainer>
                    <CreatedAt>{formattedDate}</CreatedAt>
                </GalleryTitleContainer>
            </GalleryContainer>
        </Wrapper>
    )
}