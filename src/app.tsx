import React, { useEffect } from "react";

let searchInput: HTMLInputElement | null = null;
const searchInputSelector =
  "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div > div > div.css-175oi2r.r-aqfbo4.r-gtdqiz.r-1gn8etr.r-1g40b8q > div.css-175oi2r.r-1e5uvyk.r-5zmot > div.css-175oi2r.r-136ojw6 > div > div > div > div > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div.css-175oi2r.r-1awozwy.r-18u37iz.r-16y2uox.r-1wbh5a2.r-7d4baw.r-1537yvj > div > div > div > form > div.css-175oi2r.r-1wbh5a2 > div > div > div > div > div.css-175oi2r.r-1wbh5a2.r-16y2uox > div > input";
const articleSelector =
  "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div > div > div:nth-child(3) > section > div > div > div:nth-child(3) > div > div > article";
// 'div[data-testid="tweetText"]';

const App: React.FC = () => {
  function searchEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if ((event.target as HTMLInputElement).value) {
        const keyword = (event.target as HTMLInputElement).value;
        console.log("got keyword: ", keyword);
        const containerCheck = setInterval(() => {
          const container = document.querySelector(articleSelector) as Element;
          console.log(container);
          if (container) {
            clearInterval(containerCheck);
            // const observer = new IntersectionObserver((entries) => {
            //   console.log(entries);
            //   entries.forEach((entry) => {
            //     if (entry.isIntersecting) {
            //       // insertElementAfterKeyword(keyword);
            //       console.log(entry);
            //       // 停止观察当前元素
            //       // observer.unobserve(entry.target);
            //     }
            //   });
            // });
            // observer.observe(container);

            window.addEventListener("scroll", () => {
              debounce(insertCurrencyKeyword, 200)();
            });
          }
        }, 1000);
      }
    }
  }

  useEffect(() => {
    console.log("Twitter | x 's Highlight Extension iniitialized");
    const domCheck = setInterval(() => {
      searchInput = document.querySelector(searchInputSelector);
      console.log(searchInput);
      if (searchInput) {
        console.log(searchInput);
        clearInterval(domCheck);
        if (searchInput instanceof HTMLInputElement) {
          searchInput.addEventListener("keydown", searchEvent);
        }
      }
    }, 1000);
    return () => {
      document.removeEventListener("keydown", searchEvent);
    };
  }, []);

  return <div>Twitter Highlight Extension</div>;
};

function insertCurrencyKeyword(keyword: string) {
  const articleHtml = document.querySelector(articleSelector) as HTMLDivElement;
  console.log("articleText: ", articleHtml?.innerText);
  if (!articleHtml) return;

  const regex = /\$[A-Za-z]+|\#[A-Za-z]+/g;
  const originalContent = articleHtml.innerText;
  // 匹配币别
  const matches = originalContent.match(regex);
  console.log("matchs: ", matches);
  if (!matches?.length) return;
  const currency = Array.from(new Set(matches));
  // 插入元素
  const newElement = document.createElement("div");
  newElement.style.fontSize = "20px";
  newElement.style.color = "red";
  newElement.style.position = "absolute";
  newElement.style.right = "10px";
  newElement.style.marginLeft = "10px";

  // 为每个币别创建单独的span元素并添加到newElement中
  currency.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => {
      console.log("Clicked: ", item);
    });
    newElement.appendChild(span);
    if (item !== currency[currency.length - 1]) {
      span.textContent += " ";
    }
  });

  articleHtml.style.position = "relative";
  articleHtml.parentNode?.appendChild(newElement);
}

function debounce(func: Function, delay: number): Function {
  let timer: number | null = null;

  return function (this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export default App;
