var Player = {
    playlist: [
        {
            "id": "0",
            "author": "Temptations",
            "title": "My Girl",
            "time": "3:12",
            "img": "http://streamd.hitparade.ch/cdimages/the_temptations-my_girl_s.jpg"
        },
        {
            "id": "1",
            "author": "Yazoo",
            "title": "Happy Happy People",
            "time": "2:58",
            "img": "https://i.ytimg.com/vi/IBCpr9SW2tE/hqdefault.jpg"
        },
        {
            "id": "2",
            "author": "The Supremes",
            "title": "You Can't Hurry Love",
            "time": "2:45",
            "img": "http://images.45cat.com/the-supremes-you-cant-hurry-love-tamla-motown-4.jpg"
        },
        {
            "id": "3",
            "author": "Rusted Root",
            "title": "Send Me On My Way",
            "time": "4:23",
            "img": "http://www.vinylvendors.com/Pictures/r/u/rustedroot183007.jpg"
        },
        {
            "id": "4",
            "author": "Maurice White",
            "title": "Stand By Me",
            "time": "2:52",
            "img": "https://upload.wikimedia.org/wikipedia/en/c/ca/MW_stand_by_me.jpg"
        }
    ],

    setAudioToPlayer: function(id = 0){
        let _id = Number(id),
            player = document.getElementById('player'),
            title = player.getElementsByClassName('title')[0],
            author = player.getElementsByClassName('author')[0],
            display = player.getElementsByClassName('display')[0],
            next = document.getElementById('next'),
            prev = document.getElementById('prev'),
            playlist = this.playlist[_id];

        player.dataset.id = playlist.id;
        title.innerHTML = playlist.title;
        author.innerHTML = playlist.author;

        if(typeof(this.playlist[_id + 1])!== 'undefined'){
            next.dataset.next = this.playlist[_id + 1].id;
            next.classList.add("active");
        }else{
            next.classList.remove("active");
        }

        if(typeof(this.playlist[_id - 1])!== 'undefined'){
            prev.dataset.prev = this.playlist[_id - 1].id;
            prev.classList.add("active");
        }else{
            prev.classList.remove("active");
        }

        display.style.backgroundImage  = "url("+playlist.img+")";
    },

    setPlayerPlaylist: function(){
        let playlist = this.playlist;
        for(let i = 0,music = playlist.length; music > i; i++){
            let temp = document.createElement('div'),
                list = document.getElementById('playlist').getElementsByClassName('list')[0],
                musicContent = playlist[i];
            temp.className = 'item';
            temp.dataset.itemid = musicContent.id;
            temp.innerHTML = `<p>${musicContent.time} | ${musicContent.title}</p><h2>${musicContent.author}</h2><div><i class="fa fa-share-alt"></i><i class="fa fa-heart"></i><div>`;
            list.appendChild(temp);
        }
    },

    showPlayerPlaylist: function(){
        document.getElementById('playlist').className = "active";
        setTimeout(()=>{
            document.getElementById('playlist').className += " in";
        }, 100);
    },

    closePlayerPlaylist: function(){
        document.getElementById('playlist').className = "active";
        setTimeout(()=>{
            document.getElementById('playlist').className = "";
        }, 500);
    },

    playButton: function(element){
        element.classList.toggle('play');
    },

    init: function(){
        let _this = this;
        _this.setPlayerPlaylist();
        _this.setAudioToPlayer(0);

        let getPlayListID = document.getElementById('getplaylist'),
            closePlaylistID = document.getElementById('closeplaylist'),
            itemsClass = document.getElementsByClassName('item'),
            nextButton = document.getElementById('next'),
            prevButton = document.getElementById('prev'),
            playButton = document.getElementById('playbutton');

        for (let i = 0, itemsLength = itemsClass.length; i < itemsLength; i++) {
            itemsClass[i].addEventListener('click', (e) => {
                if(e.target.offsetParent.dataset.itemid === 'undefined'){
                    _this.setAudioToPlayer(e.target.dataset.itemid);
                }else{
                    _this.setAudioToPlayer(e.target.offsetParent.dataset.itemid);
                }
                _this.closePlayerPlaylist();
            },false);
        }

        getPlayListID.addEventListener("click", () => {
            _this.showPlayerPlaylist();
        });

        closePlaylistID.addEventListener("click", () => {
            _this.closePlayerPlaylist();
        });

        nextButton.addEventListener("click", (e)=>{
            _this.setAudioToPlayer(e.target.dataset.next);
        });
        prevButton.addEventListener("click", (e)=>{
            _this.setAudioToPlayer(e.target.dataset.prev);
        });

        playButton.addEventListener("click", (e)=>{
            _this.playButton(e.target);
        });
    }
};

Player.init();