from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F

# Load model once
_tokenizer = None
_model = None

def _load_model():
    global _tokenizer, _model
    if _tokenizer is None or _model is None:
        _tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
        _model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')


def mean_pooling(token_embeddings, attention_mask):
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)


def generate_embedding(text: str):
    _load_model()
    inputs = _tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
    with torch.no_grad():
        outputs = _model(**inputs)
    embeddings = mean_pooling(outputs.last_hidden_state, inputs['attention_mask'])
    embeddings = F.normalize(embeddings, p=2, dim=1)
    return embeddings[0].tolist()
