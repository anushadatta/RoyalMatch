from flask import Flask, request, jsonify;
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "working"

@app.route('/', methods=['POST'])
def algorithm():
    data = request.get_json()
    kings_preferences = data['kings_preferences']
    queens_preferences = data['queens_preferences']

    print(kings_preferences, queens_preferences)

    N = 4   # Number of men or women 
    calculation_logs = [] 

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
        
        calculation_logs.append(f"King {king} chosen for matching.")

        # Iterate through chosen king's preferences
        index = 0
        while index < N and king_engaged[king] == False:
            # Current queen preference
            queen = kings_preferences[king][index]

            calculation_logs.append("King {} prefers Queen {}.".format(king, queen))

            # Case 1: Queen is single
            if queen_matches[queen] == -1:
                queen_matches[queen] = king
                king_engaged[king] = True
                single_count -= 1

                calculation_logs.append("King {} and Queen {} engaged.".format(king, queen))

            # Case 2: Queen is engaged
            else:
                # Find current engagement of queen
                queens_current_engagement = queen_matches[queen]

                calculation_logs.append("Queen {} currently engaged to King {}.".format(queen, queens_current_engagement))

                # Case 2.1: Ready to accept proposal
                if (queen_prefers_current_king(queens_preferences, queen, king, queens_current_engagement) == False):
                    queen_matches[queen] = king
                    king_engaged[king] = True
                    king_engaged[queens_current_engagement] = False

                    calculation_logs.append("Queen {} prefers King {} over King {}.".format(queen, king, queens_current_engagement))
                    calculation_logs.append("King {} and Queen {} are now engaged. King {} is single.".format(king, queen, queens_current_engagement))

                # Case 2.2: Not ready to accept proposal
                else:
                    calculation_logs.append("Queen {} prefers King {} over King {}.".format(queen, queens_current_engagement, king))
                    calculation_logs.append("King {} not engaged to Queen {}, and remains single.".format(king, queen))
                    pass
            
            index += 1

            print("queen matches ", queen_matches)
    
    calculation_logs.append("Matching complete.")
    
    result = {
        'matches': queen_matches,
        'logs': calculation_logs
    }

    return jsonify(result)

if __name__== '__main__': 
    app.run(port = 5000, debug = True)