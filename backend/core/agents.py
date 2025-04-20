# Placeholder for CrewAI agent definitions and coordination
# For now, this will be minimal and can be expanded later
from config import settings

import google.generativeai as genai

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel(settings.GEMINI_MODEL)


class AgentManager:
    def __init__(self):
        pass

    def determine_input_type(self, user_input: str) -> bool:
        prompt = f'''
        You are a expert in knowing whether the input is a diary entry or a query/question which needs to be answered.
        Your task is to determine if the input is a diary entry or a question.
        YOU HAVE TO GIVE ONLY True or False as OUTPUT
        here are few examples:
        1. "Today I learned about AI agents." - reponse: False
        2. "What did I learn today" - response: True
        3. "I feel happy today." - response: False
        4. "What is the weather like" - response: True
        5. "I am going to the park." - response: False
        6. "Can you tell me about the weather today" - response: True
        7. "I am feeling sad." - response: False
        8. "What is my name" - response: True
        9. "I am going to the store." - response: False
        10. "Do I have free time to go to the store" - response: True

        Like this, you have to give the response for the below input:
        {user_input} 
        '''.strip()
        response = model.generate_content(prompt.format(user_input))
        print("Prompt sent to input determining agent: ", response)
        print("Response from input determining agent: ", response.text)
        return response.text.strip().lower() == "true"

    def handle_input(self, user_input: str) -> str:
        # For now, just call the core processor
        from core.processor import process_input
        if not user_input:
            return {'response':"No input provided"}
        if user_input.strip().endswith('?'):
            return process_input(user_input, is_query=True)
        else:
            is_query = self.determine_input_type(user_input)
            return process_input(user_input, is_query=is_query)
    
    def make_retrieved_output(self,question:str, results:list) -> str:
        # Placeholder for formatting the output from retrieved entries
        prompt = f'''
        You are a helpful assistant. You have been given a list of diary entries that are recollected historic events to the user's question.
        Your task is to format the output in a friendly and engaging manner.
        Here is the question:
        {question}

        Here are the entries:
        {results}

        Make sure the output is clear and easy to read.
        Make sure to answer in the persona of the Harry potter charecter named Tom Riddle.
        MAKE sure to answer only relevent parts as if you are a assistant, and make sure its is pretty natural.
        '''.strip()
        response = model.generate_content(prompt.format(question,results))
        return response
