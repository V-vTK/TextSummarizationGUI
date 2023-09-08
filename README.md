# TextSummarizationGUI
 A greenfield project focusing on implementing, explaining and evaluating different extractive and abstractive text summarization methods within a graphical user interface. Made for the university of Oulu during my employment, 2023.

 # Usage
  1. Download the project
  2. Install and open docker
  3. Run the build.(bat/sh) file inside the usage folder
  4. Open [http://localhost:3000](http://localhost:3000)
 For more details and the manual installation see the startReadMe file inside usage folder

 # Features
   Features nine summarization methods implemented with [Sumy](https://github.com/miso-belica/sumy) and one abstractive method using Huggingface's [Transformers library](https://huggingface.co/docs/transformers/tasks/summarization).
   
   The graphical user interface is made with React (CRA), and backend is made with Python utilizing the Flask web framework. The backend and frontend are connected and launched via a docker-compose.
   Evaluation is done using ROUGE and the reference summaries are created using [GPT4All's](https://gpt4all.io/index.html) API interface.
   ## The GUI
   ![NVIDIA_Share_FoxtJrD1rK](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/f2f1716c-2173-4b90-88a1-ab6a5d1fc6ec)
   Homescreen
   ![NVIDIA_Share_lySQ3Mv331](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/66c77458-178f-4d45-bdba-d59342814361)
   Chat interface and summarization methods.
   ![NVIDIA_Share_YyVfjPrdU5](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/45470733-58bc-45a6-bb00-f126b4b977f7)
   Explanatory modules (opened by clicking the light bulb under each output)
   
   The application also hosts evaluation scripts outside the graphical user interface.
   **evaluation/SummEval** uses the material and golden summaries provided by [SummEval](https://github.com/Yale-LILY/SummEval)
   
   **evaluation/FalconROUGE** uses the golden summaries generated by the GPT4ALL [Falcon model](https://huggingface.co/nomic-ai/gpt4all-falcon).
   
   The user can define the source text via a link list. The evaluation script web scrapes the links and generates an "N" ammount of golden summaries for the ROUGE evaluation. 

 # Architecture
   ![rect237](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/5994cc76-3cc0-499e-b294-eccb851dc704)
   Docker architecture
   ![rect659](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/8f1bc823-959c-4487-8fa8-0e76b85f7030)
   Manual installation architecture
 # Evaluation results
   SummEval:
   ![python_qnLh2HqlSV](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/7be6a7b4-00c6-43ac-a6d6-b2b59b0ccbea)
   ![python_PqVezO78vD](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/62df54c2-47fa-42f3-af61-f245fd2569b7)
   ![python_Kd352QZEVq](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/0aebd362-59f2-4919-ae8f-439440af5e2a)
   
   FalconROUGE:
   ![python_oe1lurgy2H](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/0bbde0cf-f8b0-49b8-b0ce-4eb9efca4479)
   ![python_teyHu6Ni8a](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/22103de8-0103-4cfb-a95d-e174327aa669)
   ![python_3OP8sVht0g](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/892bd993-762d-4213-a150-9aca7909492a)

   Datasets compared:
   ![NVIDIA_Share_PV1EqZAzTp](https://github.com/V-vTK/TextSummarizationGUI/assets/97534406/3651fef5-4230-4a3f-8329-eb63ee566c27)

   The evaluation scripts can be found under the evaluation folder.
 
 # Limitations and problems
   GPT4All limitations -
   Abstractive model - 
   **Problems with code and architecture:**
    CSS framework - 
    JSON database - 
    Functionality first - 


