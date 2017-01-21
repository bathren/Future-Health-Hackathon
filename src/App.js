
class App {

    static get FIRST_VISIT_KEY() {
        return "storage-first-visit";
    }

    constructor() {
        console.log(Framework7);

        this.$$ = Dom7;
        this.storage = window.localStorage;
        this.app = new Framework7({
            material: true
        });
        this.mainView = this.app.addView('.view-main');

        document.addEventListener("deviceready", this.onDeviceReady);

        this.checkFirstVisit();

        $(".nav-messages").click(() => {
            this.mainView.router.loadPage('messages.html');
        });

        $("#button-issue").click(() =>{
            this.mainView.router.loadPage('form.html');
        });

        this.onMessagesInit();
    }

    onMessagesInit() {
        this.app.onPageInit('messages', function (page) {
            console.log("msg initialized");

            $(".chat-discussion").animate({ scrollTop: "3000000px" });

            $("#message-submit").click(() => {
                const textval = $("#message-textarea").val();
                if (!textval) return;

                $(".chat-discussion").append(
                    `<div class="chat-message left">
                        <img class="message-avatar" src="img/a4.jpg" alt=""/>
                        <div class="message">
                            <a class="message-author" href="chat_view.html#"> Alex Smith </a>
                            <span class="message-date"> Now </span>
                            <span class="message-content">
                            ${textval}
                        </span>
                        </div>
                    </div>`
                );
                $(".chat-discussion").animate({ scrollTop: "3000000px" });
                $("#message-textarea").val("");
            });
        });
    }

    checkFirstVisit() {
        // comment out 'if' to debug
        if (this.storage.getItem(App.FIRST_VISIT_KEY) == null) {
            //$(".nav-forward").show();
            this.mainView.router.loadPage('intro.html');
            this.storage.setItem(App.FIRST_VISIT_KEY, "-");
            /*$(".nav-forward").click(function() {
                $(this).hide();
            });*/
        }
    }
    
    onDeviceReady() {
        console.log("device ready");

    }
}

export default App;
