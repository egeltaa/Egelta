    document.getElementById('year').textContent = new Date().getFullYear();

    // Proje verisi: resimleri aynı klasöre koyun (ör: proj1.jpg). Gerçek proje verinizi buraya ekleyin.
    const projects = [
      {id:1,title:"I em Kewin",
        tags:["2D","game","unity"],
        desc:"2D Platform Game",
        thumb:"I em Kewin.jpg",
        demo:"https://magarajam.com/game/1999732437449442304",
        git:"#"},
      {id:2,title:"Rocket Team",
        tags:["rocket"],
        desc:"Teknofest Rocket Competition",
        thumb:"Rocket.jpg",
        demo:"#",
        git:"#"},
      {id:3,title:"Andy's Story",
        tags:["Renpy","game"],
        desc:"Visual Novel Game (Under development)",
        thumb:"Andy.png",
        demo:"#",
        git:"#"},
    ];

    const grid = document.getElementById('projects-grid');
    const search = document.getElementById('project-search');
    const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
    const dialog = document.getElementById('project-dialog');
    const dlgTitle = document.getElementById('dlg-title');
    const dlgThumb = document.getElementById('dlg-thumb');
    const dlgDesc = document.getElementById('dlg-desc');
    const dlgTags = document.getElementById('dlg-tags');
    const dlgDemo = document.getElementById('dlg-demo');
    const dlgGit = document.getElementById('dlg-git');
    const dlgClose = document.getElementById('dlg-close');

    function renderProjects(list){
      grid.innerHTML = '';
      if(list.length === 0){
        grid.innerHTML = '<p style="color:var(--muted)">Proje bulunamadı.</p>';
        return;
      }
      list.forEach(p=>{
        const card = document.createElement('article');
        card.className = 'project-card';
        card.setAttribute('aria-labelledby','proj-'+p.id+'-title');

        const img = document.createElement('img');
        img.className = 'project-thumb';
        img.alt = p.title + ' görseli';
        img.loading = 'lazy';
        img.src = p.thumb || 'logo.jpg';

        const title = document.createElement('h4');
        title.className = 'project-title';
        title.id = 'proj-'+p.id+'-title';
        title.textContent = p.title;

        const desc = document.createElement('p');
        desc.style.color = 'var(--muted)';
        desc.style.margin = '0';
        desc.textContent = p.desc;

        const tagsWrap = document.createElement('div');
        tagsWrap.className = 'project-tags';
        p.tags.forEach(t=>{
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = t;
          tagsWrap.appendChild(span);
        });

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        const view = document.createElement('button');
        view.className = 'link-btn';
        view.textContent = 'Details';
        view.addEventListener('click', ()=> openDialog(p));
        actions.appendChild(view);

        const demo = document.createElement('a');
        demo.className = 'link-btn';
        demo.href = p.demo;
        demo.target = '_blank';
        demo.rel = 'noopener noreferrer';
        demo.textContent = 'Live Demo';
        actions.appendChild(demo);

        card.append(img,title,desc,tagsWrap,actions);
        grid.appendChild(card);
      });
    }

    function openDialog(p){
      dlgTitle.textContent = p.title;
      dlgThumb.src = p.thumb || 'logo.jpg';
      dlgThumb.alt = p.title + ' görseli';
      dlgDesc.textContent = p.desc;
      dlgTags.innerHTML = '';
      p.tags.forEach(t=>{
        const s = document.createElement('span');
        s.className = 'tag';
        s.textContent = t;
        dlgTags.appendChild(s);
      });
      dlgDemo.href = p.demo || '#';
      dlgGit.href = p.git || '#';
      try{
        dialog.showModal();
        dialog.removeAttribute('aria-hidden');
      }catch(e){
        // fallback for older browsers
        dialog.setAttribute('open','');
      }
    }

    dlgClose.addEventListener('click', ()=>{
      dialog.close();
      dialog.setAttribute('aria-hidden','true');
    });
    dialog.addEventListener('click', (e)=>{
      if(e.target === dialog) { dialog.close(); dialog.setAttribute('aria-hidden','true'); }
    });

    // filtreleme / arama
    function applyFilters(){
      const q = search.value.trim().toLowerCase();
      const active = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
      const filtered = projects.filter(p=>{
        const matchesFilter = active === 'all' || p.tags.includes(active);
        const matchesQuery = q === '' || p.title.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q);
        return matchesFilter && matchesQuery;
      });
      renderProjects(filtered);
    }

    filterBtns.forEach(b=>{
      b.addEventListener('click', ()=>{
        filterBtns.forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        applyFilters();
      });
    });

    search.addEventListener('input', applyFilters);

    // ilk render
    renderProjects(projects);