import numpy as np
import pandas as pd
import datetime as dt
import math
import sys
import logging
logger = logging.getLogger()
logger.setLevel('DEBUG')
if len(logger.root.handlers) == 0:
    logger.root.handlers.append(logging.StreamHandler(sys.stderr))


def calc_daily_saving_required(current_balance, target_sum, target_date):
    target_saving = target_sum - current_balance
    ndays_remaining = target_date - dt.date.today()
    logger.debug('ndays remaining=%i saving target=%.2f',
                 ndays_remaining.days, target_saving)
    return target_saving / float(ndays_remaining.days)


def calc_completion_date(current_balance, target_sum, daily_saving):
    target_saving = target_sum - current_balance
    ndays_required = math.ceil(target_saving / float(daily_saving))
    logger.debug('ndays required=%i', ndays_required)
    return dt.date.today() + dt.timedelta(days=ndays_required)


def create_reccurent_events(amount, src_target, offset=dt.timedelta(days=0)):
    """create monthly events"""
    dts = pd.date_range(dt.date.today() - dt.timedelta(days=365),
                        dt.date.today(), freq='MS')
    result = [(pd.Timestamp(ts) + offset, 'R', src_target, amount)
              for ts in dts]
    logger.debug(result)
    return result


def create_payments(mean, stdev, nper_day, subjects, end_time):
    # draw waiting times - in days
    wait_times = []
    while sum(wait_times) < 365:
        wait_times.extend(np.random.exponential(1 / float(nper_day), 100))
    start = end_time - dt.timedelta(days=365)
    dts = [start + dt.timedelta(days=w) for w in np.cumsum(wait_times)]
    dts = [ts for ts in dts if ts < end_time]
    amounts = np.random.normal(mean, stdev, len(dts))
    subject_values = np.random.choice(subjects, len(dts))
    result = [(pd.Timestamp(x), 'S', s, a)
              for x, s, a in zip(dts, subject_values, amounts)]
    logger.debug(result[:5])
    return result


def create_statement_data():
    income = 2500
    rent = -900

    income_payments = create_reccurent_events(income, 'salary')
    rent_payments = create_reccurent_events(rent, 'rent',
                                            dt.timedelta(days=13))

    small_payments = create_payments(-10, 2, 2, ['your coffee shop', 'Cantine', 'best burger shop', 'the juicy juice bar', 'cocktail', 'shopping is fun - your supermarket'], dt.datetime.now())
    big_payments = create_payments(-50, 27, 0.3, ['The clothes retailer', 'Shirts and more', 'amazon says thank you', 'shopping is fun - your supermarket', 'cocktails'], dt.datetime.now())

    transactions = sorted(income_payments + rent_payments + small_payments + big_payments, key=lambda x: x[0])
    transactions = np.array(transactions)
    df = pd.DataFrame(transactions[:, 1:], transactions[:, 0], columns=['type', 'src', 'amount'])
    return df
