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
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list.authors';

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

  function calculateTagsParams(tags) {

    const params = {max: 0, min: 999999};

    for(let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max){
        params.max = tags[tag];
      } else if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagsClass(count, params){

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    const tagClass = optCloudClassPrefix + classNumber;

    return tagClass;
  }
   
  function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

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

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {

          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
          /* END LOOP: for each tag */
        }
      }
      /*insert HTML of all the links into tags wrapper*/
      tagsList.innerHTML = html;

      /* END LOOP: for every article: */

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector(optTagsListSelector);

      /* [NEW] create variable for all links HTML code */
      let allTagsHTML = '';

      /* [NEW] START LOOP: for each tag in allTags: */
      for (let tag in allTags) {

        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams);

        const tagsClass = calculateTagsClass(allTags[tag], tagsParams);
        console.log('tagLinkHTML:', tagsClass);

        const tagLink = `<li><a class="${tagsClass}" href="#tag-${tag}"><span>${tag}</span></a></li>`;
        console.log(tagLink);
 
        /* [NEW] generate code of a link and add it to allTagsHTML */
        allTagsHTML += tagLink;

      /* [NEW] END LOOP: for each tag in allTags: */
      }
      /* [NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = allTagsHTML;
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

    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const authorsList = article.querySelector(optArticleAuthorSelector);
      authorsList.innerHTML = '';

      /* get tags from data-author attribute */
      const authorTags = article.getAttribute('data-author');

      /* generate HTML of the link */
      const authorLinkHTML = `by <a href="#author-${authorTags}"><span>${authorTags}</span></a>`;

      /* check if this link is not already in allAuthors */
      if(!allAuthors[authorLinkHTML]){
        allAuthors[authorLinkHTML] = 1;
      } else {
        allAuthors[authorLinkHTML]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      authorsList.innerHTML = authorLinkHTML;
      /* END LOOP: for every article: */
    }

    /* find list of authors in right column */
    const authorList = document.querySelector(optAuthorsListSelector);

    /* create variable for all links HTML code */
    let allAuthorsHTML = '';

      /*start loop for each author in allAuthors */
    for(let author in allAuthors){

      /* generate code oflink and add it to allAutorsHTML */
      const authorLink = `<li><a href="#author-${author}"><span>${author}(${allAuthors[author]})</span></a></li>`;
      console.log(authorLink);

      allAuthorsHTML += authorLink;
      /* and loop for each author in allAuthors */
    }
    /*add HTML form allAuthorsHTML to authorList */
    authorList.innerHTML = allAuthorsHTML;
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
    const activeAuthors = article.querySelectorAll('a.active[href^="#author-"]');

    /* start loop for each active author link */
    for (let activeAuthor of activeAuthors) {

      /* remove class active */
      activeAuthor.classList.remove('active');
      /* end loop for eachactive author link */
    }
    /* find all author links with "href" attrbute equal to the "href" constant */
    const authorLinks = article.querySelectorAll('a[href="' + href + '"]');

    /* start loop for each found author link*/
    for (let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');
    }

    /* execute function "generate title links" with article selector as argument */
    generateTitleLinks('[data-author="' + authorTags + '"]');
  }

  function addClickListenersToAuthors() {

    /* find all links to authors */
    const authorList = document.querySelectorAll('[href^="author-"]');

    /* start loopfor each link */
    for (let author of authorList) {

      /* add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}