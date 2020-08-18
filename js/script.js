'use strict';
{
  /* [done] document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [done] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');

    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);

    let html = '';

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* create HTML of the link */
      document.querySelector(optTitleListSelector).insertAdjacentHTML('beforeend', linkHTML);

      /* insert link into html variable */
      html = html + linkHTML;
      console.log(html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      console.log(tagsList);
      tagsList.innerHTML = '';

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log(tag);

        /* generate HTML of the link */
        const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a>, </li>';
        console.log(tagLinkHTML);

        /* add generated code to html variable */
        html += tagLinkHTML;
        console.log(html);

        /* END LOOP: for each tag */
      }
      /*insert HTML of all the links into tags wrapper*/
      tagsList.innerHTML = html;
      /* END LOOP: for every article: */
    }
  }
  generateTags();

  function tagClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(event);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */
    const activeTags = article.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = article.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  tagClickHandler();

  function addClickListenersToTags() {
    /* find all links to tags */
    const tagList = document.querySelectorAll('[href^="tag-"]');
    /* START LOOP: for each link */
    for (let tag of tagList) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthors() {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const authorsList = article.querySelector(optArticleAuthorSelector);
      authorsList.innerHTML = '';

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-author attribute */
      const authorTags = article.getAttribute('data-author');

      /* generate HTML of the link */
      const authorLinkHTML = '<li><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a>, </li>';

      /* add generated code to html variable */
      html += authorLinkHTML;
    }

    /* insert HTML of all the links into the tags wrapper */
    authorsList.innerHTML = html;
    /* END LOOP: for every article: */
  }

  generateAuthors();

  function authorClickHandler(event) {

    /* prevent default action for this event */ 
    event.preventDefault();

    /* make new constantnamed "clickedElement" and give it a value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href"of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the href constant */
    const author = href.replace('#author-', '');
    
    /* find all author links with class "active"*/
    const activeAuthors = article.querySelectorAll ('a.active[href^="#author-"]');
    
    /* start loop for each active author link */
    for(let activeAuthor of activeAuthors) {

      /* remove class active */
      activeAuthor.classList.remove('active');
      /* end loop for eachactive author link */
    }
     /* find all author links with "href" attrbute equal to the "href" constant */
     const authorLinks = article.querySelectorAll('a[href="' + href + '"]');

     /* start loop for each found author link*/
     for(let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');
     }

    /* execute function "generate title links" with article selector as argument */
    generateTitleLinks('[data-author="' + authorTags + '"]');

  }
  authorClickHandler();

  function addClickListenersToAuthors () {

    /* find all links to authors */
    const authorList = document.querySelectorAll('[href^="author-"]');  

    /* start loopfor each link */
    for(let author of authorList) {

      /* add authorClickHandler as event listener for that link */
      author.addEventListener('click',authorClickHandler);
    }
  }
}