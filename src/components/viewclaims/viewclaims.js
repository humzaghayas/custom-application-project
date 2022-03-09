import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import FetchClaims from './view-claims.ctp.graphql';
import messages from './messages';

const getErrorMessage = (error) =>
  error.graphQLErrors?.map((e) => e.message).join('\n') || error.message;

const columns = [
  { key: 'claimno', label: 'Claim Number' },
  { key: 'orderNo', label: 'Orer Numn=ber', isSortable: true },
  { key: 'imgUrl', label: 'Image' },
  { key: 'sku', label: 'SKU' },
  { key: 'quantity', label: 'Quantity' },
];


const itemRenderer = (item, column, dataLocale, projectLanguages) => {
  switch (column.key) {
    case 'claimno':
      return item.value.claimno;
    case 'orderNo':
      return  item.value.orderNo;
    case 'imgUrl':
        return  item.value.imgUrl;
    case 'sku':
          return  item.value.sku;
    case 'quantity':
      return  item.value.quantity;
    default:
      return item[column.key];
  }
};

const ViewClaims = (props) => {
  const intl = useIntl();
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));
  const { data, error, loading } = useMcQuery(FetchClaims, {
    variables: {
      container:"claim-container",
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>

      <Constraints.Horizontal max={13}>
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.demoHint} />
        </ContentNotification>
      </Constraints.Horizontal>

      {loading && <LoadingSpinner />}

      {data?.customObjects ? (
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columns}
            rows={data.customObjects.results}
            itemRenderer={(item, column) =>
              itemRenderer(item, column, dataLocale, projectLanguages)
            }
            maxHeight={600}
            sortedBy={tableSorting.value.key}
            sortDirection={tableSorting.value.order}
            onSortChange={tableSorting.onChange}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={data.customObjects.total}
          />
        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
ViewClaims.displayName = 'ViewClaims';
ViewClaims.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default ViewClaims;
