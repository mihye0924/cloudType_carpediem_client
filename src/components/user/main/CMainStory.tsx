import { Box, List, ListItem, styled } from "@mui/material";
import CButton from "@/components/button";
import { useCallback, useEffect, useState } from "react";

interface listType {
  id: number;
  img: string;
}

const CMainStory = () => {
  const [list, setList] = useState<listType[]>([]);

  const pushList = useCallback(() => {
    for (let i = 0; i < 10; i++) {
      list[i] = {
        id: i,
        img: "/assets/images/profile-dummy.svg",
      };
    }
    return setList(list);
  }, [list]);

  useEffect(() => {
    pushList();
  }, [pushList]);

  return (
    <Section className="no-scrollbar">
      <Box sx={StoryListWrap}>
        <CButton>
          <img src="/assets/images/profile-dummy.svg" alt="나" />
        </CButton>
        <List sx={StoryList}>
          {list?.map((item: listType) => {
            return (
              <ListItem key={item.id}>
                <CButton>
                  <img src={item.img} alt="외 등" />
                </CButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Section>
  );
};

export default CMainStory;

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  maxWidth: "975px",
  margin: "0 auto",
  padding: "10px",
  overflow: "auto",
  "&.no-scrollbar::-webkit-scrollbar": {
    display: "none",
  },
  borderBottom: theme.palette.background.border,
}));
const StoryListWrap = {
  position: "relative",
  display: "flex",
  gap: "5px",
  ">button": {
    padding: 0,
    flex: "none",
    "&:after": {
      position: "absolute",
      content: "''",
      background: "url('/assets/images/plus.svg') no-repeat center center",
      zIndex: 1,
      width: "20px",
      height: "20px",
      bottom: "5px",
      right: "0",
    },
  },
};
const StoryList = {
  display: "flex",
  gap: "5px",
  padding: 0,
  li: {
    padding: 0,
  },
  button: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};
