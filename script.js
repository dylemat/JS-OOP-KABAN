$(function() {
    var board = {
        name: 'Tablica Kanban',
        $element: $('#board .column-container'),
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
    };

    $('.create-column').click(function() {
        var name = prompt('Wpisz nazwę kolumny'),
            column = new Column(name);

        board.addColumn(column);
    });

    function initSortable() {
	    $('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ',
            str = '';

        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }

        return str;
    }

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            $column = $('<div>').addClass('column col-3'),
            $columnTitle = $('<h2>').addClass('column-title').text(self.name),
            $columnCardList = $('<ul>').addClass('column-card-list'),
            $columnDelete = $('<button>').addClass('btn-delete').text('X'),
            $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

            $columnDelete.click(function() {
                self.removeColumn();
            });

            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Wpisz nazwę karty")));
            });

            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('card'),
			    $cardDescription = $('<p>').addClass('card-description').text(self.description),
			    $cardDelete = $('<button>').addClass('btn-delete').text('X');

			$cardDelete.click(function() {
				self.removeCard();
            });

            $card.append($cardDelete).append($cardDescription);

            return $card;
		}
	}

    Card.prototype = {
	    removeCard: function() {
            this.$element.remove();
        }
    }


    var todoColumn = new Column('TO DO'),
        doingColumn = new Column('DOING'),
        doneColumn = new Column('DONE'),
        card1, card2;

    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    card1 = new Card('NEW TASK');
    card2 = new Card('CREATE HERE');

    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
});
