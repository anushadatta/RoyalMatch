from flask import Flask, request, jsonify;
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['POST'])
def algorithm():
    data = request.get_json()
    kings_preferences = data['kings_preferences']
    queens_preferences = data['queens_preferences']

    print(kings_preferences, queens_preferences)

    N = 4   # Number of men or women 

    # Function to check queen's preference between current engagement and new proposal
    def queen_prefers_current_king(preference_data, queen, new_king, current_king):
        for i in range(N):
            # Prefers current engagement
            if preference_data[queen][i] == current_king:
                return True 
            # Prefers new proposal
            if preference_data[queen][i] == new_king:
                return False 

    queen_matches = [-1 for i in range(N)]  # Final stable matches array
    king_engaged = [False for i in range(N)]  # Initialise all kings to single  
    single_count = len(king_engaged)

    while (single_count > 0):
        
        # Pick any single king
        king = 0 
        while king < N:
            if king_engaged[king] == False:
                break
            king += 1
        
        # Iterate through chosen king's preferences
        index = 0
        while index < N and king_engaged[king] == False:
            # Current queen preference
            queen = kings_preferences[king][index]

            # Case 1: Queen is single
            if queen_matches[queen] == -1:
                queen_matches[queen] = king
                king_engaged[king] = True
                single_count -= 1

            # Case 2: Queen is engaged
            else:
                # Find current engagement of queen
                queens_current_engagement = queen_matches[queen]

                # Case 2.1: Ready to accept proposal
                if (queen_prefers_current_king(queens_preferences, queen, king, queens_current_engagement) == False):
                    queen_matches[queen] = king
                    king_engaged[king] = True
                    king_engaged[queens_current_engagement] = False

                # Case 2.2: Not ready to accept proposal
                else:
                    pass
            
            index += 1

            print("queen matches ", queen_matches)

    return jsonify(queen_matches)

if __name__== '__main__': 
    app.run(port = 5000, debug = True)