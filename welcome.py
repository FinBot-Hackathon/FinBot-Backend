# Copyright 2015 IBM Corp. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
from flask import Flask, jsonify, request
import analyze
import pandas as pd

app = Flask(__name__)


def _get_data():
    if hasattr(app, 'df'):
        return app.df.copy()
    else:
        app.logger.info('Creating new statement data')
        app.df = analyze.create_statement_data()
        return app.df.copy()


def _add_transaction(src, amount):
    new_row = pd.DataFrame(dict(type='S', src=src, amount=float(amount)),
                           index=[pd.Timestamp.now()])
    app.logger.info('new_row: %s', new_row)
    df = _get_data()
    app.logger.info('previous: %s', app.df.tail(2))
    df = df.append(new_row)
    app.df = df
    app.logger.info('new: %s', app.df.tail(2))


@app.route('/')
def Welcome():
    return app.send_static_file('index.html')


@app.route('/api/transaction')
def insert_transaction():
	app.logger.info('insert transaction called')
	#data = request.get_json(force=False)
	#app.logger.info('JSON received=%s', data)
	src = request.args.get('src')
	amount = float(request.args.get('amount'))
	_add_transaction(src, amount)
	return jsonify(igot="ok", other='hi')


@app.route('/api/transactions/<int:nitems>')
def get_transactions(nitems):
    data = _get_data()
    data = data.tail(nitems).sort_index(ascending=False)
    __json = data.reset_index().to_json(orient='records')
    return __json


if __name__ == "__main__":
    port = os.getenv('PORT', '5000')
    app.run(host='0.0.0.0', port=int(port))
